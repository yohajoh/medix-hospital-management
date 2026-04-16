import { z } from "zod";

export const loginCredentialsSchema = z.object({
  identifier: z.string().trim().min(3, "Enter a username, email, or phone number.").max(120, "Identifier is too long."),
  password: z.string().min(8, "Password must be at least 8 characters.").max(128, "Password is too long."),
  rememberDevice: z.boolean(),
});

export type LoginCredentialsInput = z.input<typeof loginCredentialsSchema>;
export type LoginCredentials = z.output<typeof loginCredentialsSchema>;
