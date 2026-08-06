import bcrypt from "bcryptjs";
import { Employee } from "../../employee/model/employee.js";
import { signToken } from "../../../../utils/token.js";

/**
 * Login for both admin (env credentials) and employees (DB)
 */
export const loginService = async ({ userId, password }) => {
  try {
    if (!userId || !password) {
      return {
        success: false,
        statusCode: 400,
        message: "userId and password are required",
      };
    }

    //  Admin login via .env credentials
    if (userId === process.env.ADMIN_ID) {
      if (password !== process.env.ADMIN_PASSWORD) {
        return { success: false, statusCode: 401, message: "Invalid credentials" };
      }

      const token = signToken({ id: "admin", userId, role: "admin" });

      return {
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: { token, role: "admin", userId },
      };
    }

    //  Employee login
    const employee = await Employee.findOne({ userId });
    if (!employee || !employee.isActive) {
      return { success: false, statusCode: 401, message: "Invalid credentials" };
    }

    const match = await bcrypt.compare(password, employee.password);
    if (!match) {
      return { success: false, statusCode: 401, message: "Invalid credentials" };
    }

    const token = signToken({
      id: employee._id.toString(),
      userId: employee.userId,
      role: "employee",
    });

    return {
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: {
        token,
        role: "employee",
        userId: employee.userId,
        name: employee.name,
      },
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};
