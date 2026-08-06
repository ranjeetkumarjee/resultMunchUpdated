import mongoose from "mongoose";
import { UniqueJob } from "../../createUniqueJob/model/createUniquejob.js";

/**
 * Create a job (draft). isPublished defaults to false until published.
 */
export const createJobService = async (payload, createdBy) => {
  try {
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

    const job = await UniqueJob.create({
      ...payload,
      createdBy,
      isPublished: false,
    });

    return {
      success: true,
      statusCode: 201,
      message: "Job created successfully",
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

/**
 * Update a job (same form as create, in edit mode).
 */
export const updateJobService = async (id, payload) => {
  try {
    if (!mongoose.isValidObjectId(id)) {
      return { success: false, statusCode: 400, message: "Invalid job id" };
    }

    // Do not let these be overwritten via the update body
    const { isPublished, createdBy, ...rest } = payload;

    const job = await UniqueJob.findByIdAndUpdate(id, rest, {
      new: true,
      runValidators: true,
    }).lean();

    if (!job) {
      return { success: false, statusCode: 404, message: "Job not found" };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Job updated successfully",
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

/**
 * Publish (true) or hide (false) a job from the public site.
 */
export const setPublishStateService = async (id, isPublished) => {
  try {
    if (!mongoose.isValidObjectId(id)) {
      return { success: false, statusCode: 400, message: "Invalid job id" };
    }

    const job = await UniqueJob.findByIdAndUpdate(
      id,
      { isPublished },
      { new: true },
    ).lean();

    if (!job) {
      return { success: false, statusCode: 404, message: "Job not found" };
    }

    return {
      success: true,
      statusCode: 200,
      message: isPublished ? "Job published successfully" : "Job hidden from web",
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

/**
 * Permanently delete a job.
 */
export const deleteJobService = async (id) => {
  try {
    if (!mongoose.isValidObjectId(id)) {
      return { success: false, statusCode: 400, message: "Invalid job id" };
    }

    const deleted = await UniqueJob.findByIdAndDelete(id).lean();
    if (!deleted) {
      return { success: false, statusCode: 404, message: "Job not found" };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Job deleted successfully",
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

/**
 * List jobs the logged-in user can manage (drafts + published).
 * Admin sees all; an employee sees only their own.
 */
export const getManageJobsService = async (user) => {
  try {
    const filter = user.role === "admin" ? {} : { createdBy: user.userId };

    const jobs = await UniqueJob.find(filter).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      statusCode: 200,
      message: "Jobs fetched successfully",
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
