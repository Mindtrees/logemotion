import { useMutation } from "@tanstack/react-query";
import transformEmotionData from "../utils/transformEmotionData";
import { TextAnalyzeEmotion } from "../api/emotionApi";

export const useEmotionAnalysis = () => {
  const mutation = useMutation({
    mutationFn: TextAnalyzeEmotion,
    onSuccess: (data) => {
      
      if (data) {
        const transformedData = transformEmotionData(data);
        console.log("Transformed emotions:", transformedData);
      }
    },
  }); 

  return {
    analyze: mutation.mutate, // 사용예시: analyze(textArea)
    emotions: mutation.data ? transformEmotionData(mutation.data) : [],
    rawData: mutation.data || null, // Raw data for components that need it
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset, // mutation 상태 초기화할 때. 동시에 write 입력창도 비우면 좋을 듯.
  };
};
