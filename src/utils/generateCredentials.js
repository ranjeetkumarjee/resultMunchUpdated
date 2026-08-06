import crypto from "crypto";

// Random userId like "emp_a1b2c3"
export const generateUserId = () =>
  `emp_${crypto.randomBytes(3).toString("hex")}`;

// Random password: 10 chars, url-safe
export const generatePassword = () =>
  crypto.randomBytes(8).toString("base64url").slice(0, 10);
