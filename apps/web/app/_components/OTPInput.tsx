"use client";

import React, { useEffect, useRef, useState } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
}

export default function OTPInput({ length = 6, onComplete, disabled }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (Number.isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onComplete(combinedOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(data)) return;

    const newOtp = data.split("");
    setOtp([...newOtp, ...new Array(length - data.length).fill("")]);
    onComplete(data);
  };

  return (
    <div className="flex justify-center gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          aria-label={`OTP digit ${index + 1}`}
          disabled={disabled}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="h-16 w-12 border-b-2 border-gray-200 bg-gray-50 text-center text-2xl font-bold outline-none transition-all focus:border-[#1A4F95] disabled:opacity-50"
        />
      ))}
    </div>
  );
}
