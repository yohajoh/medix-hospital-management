import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

type QRVerifyResult = {
  success: boolean;
  data: {
    message?: string;
    user?: unknown;
  };
};

export const useQRLogin = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const hasCalled = useRef(false);

  const getApiUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    return "https://medix-api-re2o.onrender.com/api";
  };

  const API_URL = getApiUrl();
  const SOCKET_URL = API_URL.replace("/api", "");
  const verifyScannerSession = async (
    sid: string,
    endpoint: string = "/auth/qr/approve",
  ): Promise<QRVerifyResult> => {
    setIsVerifying(true);

    const baseUrl = API_URL.replace(/\/$/, "");
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const finalUrl = `${baseUrl}${cleanEndpoint}`;

    try {
      const response = await fetch(finalUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ sessionId: sid }),
        credentials: "include",
        mode: "cors",
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const errorText = await response.text();
        console.error("Server Error HTML:", errorText);
        throw new Error(
          "Server error: Endpoint returned HTML instead of JSON.",
        );
      }

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, data: data || { message: "Auth failed" } };
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Connection lost. Please try again.";
      console.error("Verification Catch:", err);
      return {
        success: false,
        data: { message },
      };
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/auth/login"
    )
      return;
    if (hasCalled.current) return;
    hasCalled.current = true;

    let loginSocket: Socket | null = null;

    const fetchQR = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/qr/generate`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Unable to initialize QR login session.");
        }

        const data = await res.json();
        setSessionId(data.sessionId);

        loginSocket = io(SOCKET_URL, {
          withCredentials: true,
          transports: ["websocket"],
        });

        loginSocket.emit("qr:join-session", data.sessionId);

        loginSocket.on("qr:success", ({ token }: { token: string }) => {
          const expires = new Date();
          expires.setDate(expires.getDate() + 7);
          const isProd = window.location.hostname.includes("onrender.com");
          const cookieOptions = isProd
            ? "SameSite=None; Secure"
            : "SameSite=Lax";

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
  }, [router, API_URL, SOCKET_URL]);

  return { sessionId, verifyScannerSession, isVerifying };
};
