// import { useState, useCallback } from 'react';
// import { analyzeEmotion, EmotionResult } from '../api/emotionApi';

// interface UseEmotionAnalysisReturn {
//   emotions: EmotionResult[];
//   isLoading: boolean;
//   error: string | null;
//   analyze: (text: string) => Promise<void>;
//   reset: () => void;
// }
// //
// export const useEmotionAnalysis = (): UseEmotionAnalysisReturn => {
//   const [emotions, setEmotions] = useState<EmotionResult[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const analyze = useCallback(async (text: string) => {
//     if (!text.trim()) {
//       setError('Please enter text to analyze.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const results = await analyzeEmotion(text);
//       setEmotions(results);
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An error occurred during emotion analysis.';
//       setError(errorMessage);
//       setEmotions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const reset = useCallback(() => {
//     setEmotions([]);
//     setError(null);
//     setIsLoading(false);
//   }, []);

//   return {
//     emotions,
//     isLoading,
//     error,
//     analyze,
//     reset
//   };
// };

export {};
