import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

export const useQRLogin = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQR = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/qr/generate`);
      const data = await res.json();
      setSessionId(data.sessionId);

      // Connect to Socket
      const socket = io(process.env.NEXT_PUBLIC_API_URL!, { withCredentials: true });

      socket.emit("qr:join-session", data.sessionId);

      socket.on("qr:authorized", ({ token }) => {
        const DAYS_TO_PERSIST = 7;
        const expires = new Date();
        expires.setDate(expires.getDate() + DAYS_TO_PERSIST);

        // This line handles the persistence logic
        document.cookie = `token=${token}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax; ${
          process.env.NODE_ENV === "production" ? "Secure" : ""
        }`;

        router.push("/dashboard");
      });

      return () => socket.disconnect();
    };

    fetchQR();
  }, [router]);

  return { sessionId };
};
