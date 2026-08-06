import { loginService } from "../services/auth.service.js";

export const loginController = async (req, res) => {
  try {
    const result = await loginService(req.body);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
