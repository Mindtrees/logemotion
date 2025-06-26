import { useMutation} from '@tanstack/react-query';
import { EmotionAnalysisReq, EmotionAnalysisRes } from '../models/api';
import { analyze } from '../api/analyzeApi';

const useAnalyze = () => {

    return useMutation({
        mutationFn: (text: string) => {
            if (!text.trim()) {
                return Promise.reject(new Error('Text is required for emotion analysis'));
            }  
            const params: EmotionAnalysisReq = { text };
            return analyze(params);
        },
        onSuccess: (data: EmotionAnalysisRes) => {
            console.log('Emotion Analysis Response:', data);
        },
        onError: (error) => {
            throw new Error ('Emotion analysis failed')
        },
    });
};

export default useAnalyze;