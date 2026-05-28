import { getAnswerKeyServices } from "../services/answerKey.service.js";

export const getAnswerKeyController = async (req, res) => {
  try {
    const result = await getAnswerKeyServices(req.query);

    return res.status(200).json({
      success: true,
      message: "Answer keys fetched successfully",
      ...result,
    });
  } catch (error) {
    console.error("Get Answer Keys Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch answer keys",
    });
  }
};
