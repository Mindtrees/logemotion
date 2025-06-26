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

export const EmotionColors = {
  joy: '#FFF3B8',
  anger: '#FFB3BA',
  fear: '#FFB68A',
  sadness: '#D8B7FF',
  analytical: '#B8E6B8',
  confident: '#B8D4FF',
  tentative: '#FFCCF2'
} as const;

export const EmotionNames = {
  joy: 'Joy',
  anger: 'Anger', 
  fear: 'Fear',
  sadness: 'Sadness',
  analytical: 'Analytical',
  confident: 'Confident',
  tentative: 'Tentative'
} as const;