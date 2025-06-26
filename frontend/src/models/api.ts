export interface EmotionAnalysisReq {
  text: string;
}

export interface EmotionAnalysisRes {
  emotions_detected: string[];
  emotion_scores: {
    joy: number;
    surprise: number;
    sadness: number;
    disgust: number;
    anger: number;
    fear: number;
  };
  emotions_normalized: {
    joy: number;
    surprise: number;
    sadness: number;
    disgust: number;
    anger: number;
    fear: number;
  };
  thresholds_normalized: {
    joy: number;
    surprise: number;
    sadness: number;
    disgust: number;
    anger: number;
    fear: number;
  };
  version: string;
  author: string;
  email: string;
  result_code: string;
  result_msg: string;
}

