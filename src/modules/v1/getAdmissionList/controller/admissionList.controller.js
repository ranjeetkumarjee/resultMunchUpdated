import { getAdmissionListServices } from "../services/admissionList.services.js";

export const getAdmissionListController = async (req, res) => {
  try {
    const result = await getAdmissionListServices(req.query);

    return res.status(200).json({
      success: true,
      message: "Admissions fetched successfully",
      ...result,
    });
  } catch (error) {
    console.error("Get Admissions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admissions",
    });
  }
};
