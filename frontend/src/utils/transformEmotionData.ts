import { EmotionAnalysisResponse, EmotionResult } from "../models";

const emotionColors: Record<string, string> = {
  joy: "#B8E6B8",
  anger: "#FFB3BA",
  fear: "#B8D4FF",
  sadness: "#D8B7FF",
  surprise: "#FFD580",
  disgust: "#C0C0C0",
};

const transformEmotionData = (
  data: EmotionAnalysisResponse
): EmotionResult[] => {
  if (!data || !data.emotions_normalized) return [];
  const topEmotions = Object.entries(data.emotions_normalized)
    .filter(([, value]) => value > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const total = topEmotions.reduce((sum, [, value]) => sum + value, 0);

  return topEmotions.map(([key, value]) => ({
    //   name: key.charAt(0).toUpperCase() + key.slice(1),
    name: key,
    value: Math.round((value / total) * 100), // 총 100%가 되도록 재계산
    color: emotionColors[key] || "#ccc",
  }));
};

export default transformEmotionData;
