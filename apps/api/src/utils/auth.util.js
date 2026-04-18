import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} The hashed password.
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

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
