import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Employee } from "../model/employee.js";
import {
  generateUserId,
  generatePassword,
} from "../../../../utils/generateCredentials.js";

/**
 * Admin creates an employee. Generates a random userId + password.
 * Returns the plain password ONCE (it is stored hashed).
 */
export const createEmployeeService = async ({ name }) => {
  try {
    // Ensure a unique userId (retry a few times on the rare collision)
    let userId;
    for (let i = 0; i < 5; i++) {
      const candidate = generateUserId();
      const exists = await Employee.exists({ userId: candidate });
      if (!exists) {
        userId = candidate;
        break;
      }
    }
    if (!userId) {
      return { success: false, statusCode: 500, message: "Could not generate user id" };
    }

    const plainPassword = generatePassword();
    const hashed = await bcrypt.hash(plainPassword, 10);

    const employee = await Employee.create({
      name: name || "",
      userId,
      password: hashed,
      role: "employee",
    });

    return {
      success: true,
      statusCode: 201,
      message: "Employee created successfully",
      // Password is returned only here — show it to the admin once.
      data: {
        _id: employee._id,
        name: employee.name,
        userId: employee.userId,
        password: plainPassword,
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

export const getEmployeesService = async () => {
  try {
    const employees = await Employee.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      statusCode: 200,
      message: "Employees fetched successfully",
      data: employees,
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

export const deleteEmployeeService = async (id) => {
  try {
    if (!mongoose.isValidObjectId(id)) {
      return { success: false, statusCode: 400, message: "Invalid employee id" };
    }

    const deleted = await Employee.findByIdAndDelete(id).lean();
    if (!deleted) {
      return { success: false, statusCode: 404, message: "Employee not found" };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Employee removed successfully",
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
