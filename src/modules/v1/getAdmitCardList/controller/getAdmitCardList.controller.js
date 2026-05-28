import { getAdmitCardListServices } from "../services/getAdmitCardList.services.js";
export const getAdmitCardListController = async (req, res) => {
  try {
    const result = await getAdmitCardListServices(req.query);

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
