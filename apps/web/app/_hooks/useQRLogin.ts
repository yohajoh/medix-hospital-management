// import { useEffect, useRef, useState } from "react";
// import { io, type Socket } from "socket.io-client";
// import { useRouter } from "next/navigation";

// export const useQRLogin = () => {
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [isVerifying, setIsVerifying] = useState(false); // Track mobile scan status
//   const router = useRouter();
//   const hasCalled = useRef(false);

//   const getApiUrl = () => {
//     if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;

//     if (typeof window !== "undefined") {
//       const host = window.location.hostname;
//       if (host.includes("onrender.com") || host === "your-domain.com") {
//         return "https://medix-api-re2o.onrender.com/api";
//       }
//     }
//     return "http://localhost:5000/api";
//   };

//   const API_URL = getApiUrl();

//   /**
//    * NEW: FLEXIBLE SCAN VERIFICATION LOGIC
//    * Call this from your /auth/scan page.
//    */
//   const verifyScannerSession = async (sid: string, endpoint: string = "/auth/qr/verify") => {
//     setIsVerifying(true);

//     // Clean the URL to avoid double slashes like .../api//auth/...
//     const cleanBaseUrl = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
//     const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
//     const finalUrl = `${cleanBaseUrl}${cleanEndpoint}`;

//     console.log("Mobile calling:", finalUrl);

//     try {
//       const response = await fetch(finalUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sessionId: sid }),
//         credentials: "include", // Forces the browser to send the 'token' cookie
//         mode: "cors",
//       });

//       const data = await response.json();
//       return { success: response.ok, data };
//     } catch (err) {
//       console.error("Scan Error:", err);
//       return { success: false, message: "Network error" };
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   /**
//    * EXISTING: QR GENERATION & SOCKET LISTENER
//    * Logic remains untouched, only optimized for Production stability.
//    */
//   useEffect(() => {
//     // Only run the socket listener on the login page
//     if (typeof window !== "undefined" && window.location.pathname !== "/auth/login") return;

//     if (hasCalled.current) return;
//     hasCalled.current = true;

//     let socket: Socket | null = null;

//     const fetchQR = async () => {
//       console.log("Fetching QR...");

//       try {
//         const res = await fetch(`${API_URL}/auth/qr/generate`);
//         const data = await res.json();

//         console.log("Session ID:", data.sessionId);
//         setSessionId(data.sessionId);

//         // Optimization: websocket only transport to prevent Render.com network errors
//         socket = io(API_URL.replace("/api", ""), {
//           withCredentials: true,
//           transports: ["websocket"],
//         });

//         socket.emit("qr:join-session", data.sessionId);

//         socket.on("qr:authorized", ({ token }: { token: string }) => {
//           console.log("Authorized. Token received.");

//           const expires = new Date();
//           expires.setDate(expires.getDate() + 7);

//           // Production Fix: SameSite=None is required for cross-domain cookies on Render
//           const isProd = window.location.hostname.includes("onrender.com");
//           const cookieOptions = isProd ? "SameSite=None; Secure" : "SameSite=Lax";

//           document.cookie = `token=${token}; Path=/; Expires=${expires.toUTCString()}; ${cookieOptions}`;

//           router.push("/dashboard");
//         });
//       } catch (error) {
//         console.error("QR Fetch Error:", error);
//       }
//     };

//     fetchQR();

//     return () => {
//       if (socket) {
//         socket.disconnect();
//         console.log("Socket disconnected");
//       }
//     };
//   }, [router, API_URL]);

//   return { sessionId, verifyScannerSession, isVerifying };
// };

// useQRCode.js

import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

export const useQRLogin = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null); // Added socket state
  const router = useRouter();
  const hasCalled = useRef(false);

  const getApiUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    return "https://medix-api-re2o.onrender.com/api";
  };

  const API_URL = getApiUrl();
  const SOCKET_URL = API_URL.replace("/api", "");

  // Helper to initialize socket for mobile
  const initMobileSocket = () => {
    if (socket) return socket;
    const s = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });
    setSocket(s);
    return s;
  };

  const verifyScannerSession = async (sid: string, endpoint: string = "/auth/qr/verify") => {
    setIsVerifying(true);
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ sessionId: sid }),
        credentials: "include", // Required to send the JWT token
        mode: "cors",
      });

      const data = await response.json();

      // If HTTP confirms you are logged in, THEN we talk to the socket
      if (response.ok) {
        const mobSocket = initMobileSocket();
        mobSocket.emit("qr:verify", {
          sessionId: sid,
          userData: data.user,
        });
      }

      return { success: response.ok, data };
    } catch (err) {
      return { success: false, data: { message: "Connection lost" } };
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/auth/login") return;
    if (hasCalled.current) return;
    hasCalled.current = true;

    let loginSocket: Socket | null = null;

    const fetchQR = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/qr/generate`);
        const data = await res.json();
        setSessionId(data.sessionId);

        loginSocket = io(SOCKET_URL, {
          withCredentials: true,
          transports: ["websocket"],
        });

        loginSocket.emit("qr:join-session", data.sessionId);

        // Updated event name to match backend: qr:success
        loginSocket.on("qr:success", ({ token, user }: { token: string; user: any }) => {
          const expires = new Date();
          expires.setDate(expires.getDate() + 7);
          const isProd = window.location.hostname.includes("onrender.com");
          const cookieOptions = isProd ? "SameSite=None; Secure" : "SameSite=Lax";

          document.cookie = `token=${token}; Path=/; Expires=${expires.toUTCString()}; ${cookieOptions}`;
          router.push("/dashboard");
        });
      } catch (error) {
        console.error("QR Fetch Error:", error);
      }
    };

    fetchQR();
    return () => {
      loginSocket?.disconnect();
    };
  }, [router, API_URL]);

  return { sessionId, verifyScannerSession, isVerifying };
};
