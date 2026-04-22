"use client";

import { QRCodeCanvas } from "qrcode.react";

export function QrCode({ value, size = 120 }: { value: string; size?: number }) {
  return (
    <div className="rounded-2xl bg-white border border-black/5 p-4 shadow-[0_16px_40px_rgba(16,41,69,0.08)]">
      <QRCodeCanvas value={value} size={size} includeMargin />
    </div>
  );
}

