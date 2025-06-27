import { Timestamp } from "firebase/firestore";

export interface Posts {
  id?: string;
  title: string;
  content: string;
  userId: string;
  userEmail: string;
  emotionAnalysis?: EmotionAnalysisResponse;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreatePostData {
  title: string;
  content: string;
  userId: string;
  userEmail: string;
  emotionAnalysis?: EmotionAnalysisResponse;
}

export interface EmotionScores {
  joy: number;
  surprise: number;
  sadness: number;
  disgust: number;
  anger: number;
  fear: number;
}

export interface EmotionAnalysisResponse {
  emotions_detected: string[];
  emotion_scores: EmotionScores;
  emotions_normalized: EmotionScores;
  thresholds_normalized: EmotionScores;
  version: string;
  author: string;
  email: string;
  result_code: string;
  result_msg: string;
}

export interface EmotionResult {
  name: string;
  value: number;
  color: string;
}
