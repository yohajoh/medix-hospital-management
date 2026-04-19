import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medix | Clinical Operations Platform",
  description:
    "A modern hospital management platform for clinical operations, compliance, and patient coordination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
