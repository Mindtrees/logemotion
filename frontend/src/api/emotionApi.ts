import { EmotionAnalysisResponse, EmotionResult, EmotionColors, EmotionNames } from '../models';

const API_KEY = process.env.REACT_APP_TWINWORD_API_KEY;
const API_HOST = process.env.REACT_APP_TWINWORD_API_HOST;

export const analyzeEmotion = async (text: string): Promise<EmotionResult[]> => {
  if (!API_KEY) {
    throw new Error('TWINWORD API key is not configured. Please add REACT_APP_TWINWORD_API_KEY to your .env file.');
  }

  if (!API_HOST) {
    throw new Error('TWINWORD API host is not configured. Please add REACT_APP_TWINWORD_API_HOST to your .env file.');
  }

  const url = `https://${API_HOST}/analyze/`;
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
    body: new URLSearchParams({
      text: text
    })
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data: EmotionAnalysisResponse = await response.json();
    
    return transformEmotionData(data);
  } catch (error) {
    console.error('Emotion analysis API error:', error);
    throw error;
  }
};

const transformEmotionData = (data: EmotionAnalysisResponse): EmotionResult[] => {
  return Object.entries(data.emotion_scores)
    .map(([key, value]) => ({
      name: EmotionNames[key as keyof typeof EmotionNames],
      value: Math.round(Number(value) * 100),
      color: EmotionColors[key as keyof typeof EmotionColors]
    }))
    .filter(emotion => emotion.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);
};

export const getDominantEmotion = (emotions: EmotionResult[]): string => {
  return emotions.length > 0 ? emotions[0].name : 'Neutral';
};

export const getEmotionByName = (emotions: EmotionResult[], name: string): EmotionResult | undefined => {
  return emotions.find(emotion => emotion.name.toLowerCase() === name.toLowerCase());
};