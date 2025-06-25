const API_KEY = process.env.REACT_APP_TWINWORD_API_KEY;
const API_HOST = process.env.REACT_APP_TWINWORD_API_HOST;

export interface EmotionAnalysisResponse {
  emotion_scores: {
    anger: number;
    fear: number;
    joy: number;
    sadness: number;
    analytical: number;
    confident: number;
    tentative: number;
  };
  emotion: string;
}

export interface EmotionResult {
  name: string;
  value: number;
  color: string;
}

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
  const emotionColors = {
    joy: '#FFF3B8',
    anger: '#FFB3BA',
    fear: '#FFB68A',
    sadness: '#D8B7FF',
    analytical: '#B8E6B8',
    confident: '#B8D4FF',
    tentative: '#FFCCF2'
  };

  const emotionNames = {
    joy: 'Joy',
    anger: 'Anger', 
    fear: 'Fear',
    sadness: 'Sadness',
    analytical: 'Analytical',
    confident: 'Confident',
    tentative: 'Tentative'
  };

  return Object.entries(data.emotion_scores)
    .map(([key, value]) => ({
      name: emotionNames[key as keyof typeof emotionNames],
      value: Math.round(value * 100),
      color: emotionColors[key as keyof typeof emotionColors]
    }))
    .filter(emotion => emotion.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);
};