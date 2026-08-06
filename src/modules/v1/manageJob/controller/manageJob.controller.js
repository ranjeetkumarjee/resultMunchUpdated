import {
  createJobService,
  updateJobService,
  setPublishStateService,
  deleteJobService,
  getManageJobsService,
} from "../services/manageJob.service.js";

export const createJobController = async (req, res) => {
  try {
    const result = await createJobService(req.body, req.user.userId);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Create Job Error:", error);
    return res.status(500).json({ success: false, message: "Failed to create job" });
  }
};

export const updateJobController = async (req, res) => {
  try {
    const result = await updateJobService(req.params.id, req.body);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Update Job Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update job" });
  }
};

export const publishJobController = async (req, res) => {
  try {
    const result = await setPublishStateService(req.params.id, true);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Publish Job Error:", error);
    return res.status(500).json({ success: false, message: "Failed to publish job" });
  }
};

export const hideJobController = async (req, res) => {
  try {
    const result = await setPublishStateService(req.params.id, false);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Hide Job Error:", error);
    return res.status(500).json({ success: false, message: "Failed to hide job" });
  }
};

export const deleteJobController = async (req, res) => {
  try {
    const result = await deleteJobService(req.params.id);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Delete Job Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete job" });
  }
};

export const getManageJobsController = async (req, res) => {
  try {
    const result = await getManageJobsService(req.user);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("List Manage Jobs Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};
