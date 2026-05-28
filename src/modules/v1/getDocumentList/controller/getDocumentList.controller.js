import { getDocumentListServices } from "../services/getDocument.service.js";

export const getDocumentListController = async (req, res) => {
  try {
    const result = await getDocumentListServices(req.query);

    return res.status(200).json({
      success: true,
      message: "Documents fetched successfully",
      ...result,
    });
  } catch (error) {
    console.error("Get Documents Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch documents",
    });
  }
};
