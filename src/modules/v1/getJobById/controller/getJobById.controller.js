import { getJobByIdService } from "../services/getJobById.service.js";

export const getJobByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getJobByIdService(id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Get Job By Id Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job",
    });
  }
};
