import {
  createEmployeeService,
  getEmployeesService,
  deleteEmployeeService,
} from "../services/employee.service.js";

export const createEmployeeController = async (req, res) => {
  try {
    const result = await createEmployeeService(req.body);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Create Employee Error:", error);
    return res.status(500).json({ success: false, message: "Failed to create employee" });
  }
};

export const getEmployeesController = async (req, res) => {
  try {
    const result = await getEmployeesService();
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Get Employees Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch employees" });
  }
};

export const deleteEmployeeController = async (req, res) => {
  try {
    const result = await deleteEmployeeService(req.params.id);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Delete Employee Error:", error);
    return res.status(500).json({ success: false, message: "Failed to remove employee" });
  }
};
