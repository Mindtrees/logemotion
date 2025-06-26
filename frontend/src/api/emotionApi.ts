import { EmotionAnalysisResponse } from "../models";
import api from "../utils/api";

export const TextAnalyzeEmotion = async (
  text: string
): Promise<EmotionAnalysisResponse> => {
  try {
    if (!text.trim()) {
      throw new Error("Please enter text");
    }
    const response = await api.post("", new URLSearchParams({ text }));
    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch text emotion analysis");
  }
};
