import { UniqueJob } from "../model/createUniquejob.js";
/**
 * Create Job Service
 */
export const createJobService = async (payload) => {
  try {
    // Duplicate check (better: use UNIQUE index in schema)
    const existingJob = await UniqueJob.findOne({
      advertisementNo: payload.advertisementNo,
    }).lean();

    if (existingJob) {
      return {
        success: false,
        statusCode: 409,
        message: "Job with this advertisement number already exists",
      };
    }

    //  Create job
    const job = await UniqueJob.create(payload);

    return {
      success: true,
      statusCode: 201,
      message: "Job created successfully",
      data: job,
    };
  } catch (error) {
    // Handle Mongo duplicate error (if using unique index)
    return {
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};

export const getAllJobsService = async () => {
  try {
    const jobs = await UniqueJob.find().sort({ createdAt: -1 }).lean();

    return {
      success: true,
      statusCode: 200,
      message: "Jobs retrieved successfully",
      data: jobs,
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
