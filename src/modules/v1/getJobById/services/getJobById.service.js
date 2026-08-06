import mongoose from "mongoose";
import { UniqueJob } from "../../createUniqueJob/model/createUniquejob.js";

/**
 * Get a single job by its _id
 */
export const getJobByIdService = async (id) => {
  try {
    //  Validate ObjectId before hitting the DB
    if (!mongoose.isValidObjectId(id)) {
      return {
        success: false,
        statusCode: 400,
        message: "Invalid job id",
      };
    }

    const job = await UniqueJob.findById(id).lean();

    if (!job) {
      return {
        success: false,
        statusCode: 404,
        message: "Job not found",
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Job fetched successfully",
      data: job,
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
