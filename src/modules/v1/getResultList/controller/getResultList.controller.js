import { getResultListServices } from "../services/getResultList.services.js";

export const getResultListController = async (req, res) => {
  try {
    const result = await getResultListServices(req.query);

    return res.status(200).json({
      success: true,
      message: "Results fetched successfully",
      ...result,
    });
  } catch (error) {
    console.error("Get Results Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch results",
    });
  }
};
