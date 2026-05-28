import {
  createJobService,
  getAllJobsService,
} from "../services/createJob.service.js";

export const createJobController = async (req, res, next) => {
  try {
    console.log("Yhatak");
    const result = await createJobService(req.body);

    return res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result.data || null,
      error: result.error || null,
    });
  } catch (error) {
    console.error("Error in createJobController:", error);

    next(error); // fallback (rare case);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
