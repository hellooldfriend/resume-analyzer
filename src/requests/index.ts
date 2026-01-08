import axios from 'axios';
import type { XAIv1ChatCompletion } from '../shared/types';

type AnalyzeCVRequestData = {
  url: string;
  model: string;
  text: string;
};

type AnalyzeCVRequestResponse = {
  data: XAIv1ChatCompletion;
}


export const analyzeCVRequest = async ({ url, model, text }: AnalyzeCVRequestData): Promise<AnalyzeCVRequestResponse> => {
  const API_KEY = import.meta.env.VITE_X_AI_TOKEN_KEY;

  return await axios.post(
    url,
    {
      model,
      messages: [
        { role: 'system', content: 'Ты анализатор резюме. Выдели ключевые навыки, опыт, слабые места и дай рекомендации.' },
        { role: 'user', content: `Анализируй это резюме: ${text.substring(0, 4000)}` } // Ограничь длину, если текст длинный
      ],
    },
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  )
}