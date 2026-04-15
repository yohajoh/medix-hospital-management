import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * Replaces userSchema.methods.correctPassword
 * @param {string} candidatePassword - Plain text from login request
 * @param {string} userPassword - Hashed password from PostgreSQL
 */
export const comparePassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * @param {string} id - The UUID from PostgreSQL
 * @param {string} role - The Enum role (ADMIN, DOCTOR, etc.)
 */
export const generateAuthToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
