import axios from 'axios';
import { EmotionAnalysisReq, EmotionAnalysisRes } from '../models/api';

const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY!;
const TWINWORD_API_URL = process.env.REACT_APP_TWINWORD_API_URL!;
const TWINWORD_API_HOST = process.env.REACT_APP_TWINWORD_API_HOST!;

export const analyze = async (params: EmotionAnalysisReq): Promise<EmotionAnalysisRes> => {
  try {
    const response = await axios.post(TWINWORD_API_URL, 
      new URLSearchParams({
        text: params.text,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': TWINWORD_API_HOST,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API request failed with status ${error.response?.status || 'unknown'}`);
    }
    throw new Error('Failed to analyze emotion');
  }
};