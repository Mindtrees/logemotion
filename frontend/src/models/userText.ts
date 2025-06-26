import { Timestamp } from 'firebase/firestore';
import { EmotionResult } from './emotions';

export interface UserText {
  id: string;
  content: string;
  title?: string;
  emotions: EmotionResult[];  // 기존 EmotionResult 활용
  dominantEmotion: string;    // 가장 높은 점수의 감정
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}

export interface CreateUserTextData {
  content: string;
  title?: string;
  emotions: EmotionResult[];
  dominantEmotion: string;
}

export interface UpdateUserTextData {
  content?: string;
  title?: string;
  emotions?: EmotionResult[];
  dominantEmotion?: string;
}