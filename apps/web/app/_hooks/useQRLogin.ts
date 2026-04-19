import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

export const useQRLogin = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    let socket: Socket | null = null;

    const fetchQR = async () => {
      console.log("Fetching QR...");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/qr/generate`);
      const data = await res.json();

      console.log("Session ID:", data.sessionId);

      setSessionId(data.sessionId);

      socket = io(process.env.NEXT_PUBLIC_API_URL!, { withCredentials: true });

      socket.emit("qr:join-session", data.sessionId);

      socket.on("qr:authorized", ({ token }: { token: string }) => {
        console.log("Authorized. Token received.");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        document.cookie = `token=${token}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax; ${
          process.env.NODE_ENV === "production" ? "Secure" : ""
        }`;

        router.push("/dashboard");
      });
    };

    fetchQR();

    return () => {
      if (socket) socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [router]);

  return { sessionId };
};
