export interface Posts {

}

export interface PostAnalysisRequest {
  title: string;
  content: string;
}

export interface EmotionAnalysisResponse {
  emotions_detected: string[];
  emotion_scores: {
    [key: string]: number;
  };
  emotions_normalized: {
    [key: string]: number;
  };
  thresholds_normalized: {
    [key: string]: number;
  };
  version: string;
  author: string;
  email: string;
  result_code: string;
  result_msg: string;
}
