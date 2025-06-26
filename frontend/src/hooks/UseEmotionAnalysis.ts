import { useState } from 'react';

interface EmotionResult {
  name: string;
  value: number;
  color: string;
}

export const useEmotionAnalysis = () => {
  const [emotions, setEmotions] = useState<EmotionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    emotions,
    isLoading,
    error,
    analyze: async (text: string) => {
      console.log('Analyzing:', text);
      setIsLoading(true);
      setTimeout(() => {
        setEmotions([{ name: 'Joy', value: 80, color: '#FFF3B8' }]);
        setIsLoading(false);
      }, 1000);
    },
    reset: () => {
      setEmotions([]);
      setError(null);
    },
    isSaving: false,
    saveError: null,
    saveText: async () => 'test-id',
    userTexts: [],
    textsLoading: false,
    textsError: null,
    deleteText: async () => true,
    updateText: async () => true
  };
};