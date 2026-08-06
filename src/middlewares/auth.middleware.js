import { verifyToken } from "../utils/token.js";

/**
 * Verifies the Bearer token and attaches { id, role, userId } to req.user
 */
export const authenticate = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded; // { id, role, userId }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/**
 * Restricts a route to the given roles, e.g. authorizeRoles("admin")
 */
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
