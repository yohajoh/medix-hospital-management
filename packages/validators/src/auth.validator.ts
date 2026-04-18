import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Username, email, or phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const qrApprovalSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
});

export type QRApprovalInput = z.infer<typeof qrApprovalSchema>;
