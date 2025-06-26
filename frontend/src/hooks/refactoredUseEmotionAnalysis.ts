import { useMutation } from "@tanstack/react-query";
import { TextAnalyzeEmotion } from "../api/refactoredEmotionApi";
import transformEmotionData from "../utils/transformEmotionData";

export const useEmotionAnalysis = () => {
  const mutation = useMutation({
    mutationFn: TextAnalyzeEmotion,
    onSuccess: () => {
      console.log("Text emotion analysis success");
    },
  });

  return {
    analyze: mutation.mutate, // 사용예시: analyze(textArea)
    emotions: mutation.data ? transformEmotionData(mutation.data) : [],
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset, // mutation 상태 초기화할 때. 동시에 write 입력창도 비우면 좋을 듯.
  };
};
