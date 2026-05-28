import { getAllJobServices } from "../services/getAllJob.services.js";
export const getJobsController = async (req, res) => {
  try {
    const result = await getAllJobServices(req.query);

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      ...result,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};
