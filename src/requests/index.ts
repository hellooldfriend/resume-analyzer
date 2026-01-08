import axios from 'axios';
import type { XAIv1ChatCompletion } from '../shared/types';

type ServiceType = 'xai' | 'openai';

type AnalyzeCVRequestData = {
  type: ServiceType;
  text: string;
};

type AnalyzeCVRequestResponse = {
  data: XAIv1ChatCompletion;
}

type ServiceData = {
  url: string;
  model: 'grok-beta' | string;
}

const serviceData: Record<ServiceType, ServiceData> = {
  xai: {
    url: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-beta'
  },
  openai: {
    url: '',
    model: '',
  },
}


export const analyzeCVRequest = async ({ type, text }: AnalyzeCVRequestData): Promise<AnalyzeCVRequestResponse> => {
  const API_KEY = import.meta.env.VITE_X_AI_TOKEN_KEY;

  const service = serviceData[type];

  if (!service) {
    console.error('Не удалось определить сервис');
    Promise.reject();
  }

  return await axios.post(
    service.url,
    {
      model: service.model,
      messages: [
        { role: 'system', content: 'Ты анализатор резюме. Выдели ключевые навыки, опыт, слабые места и дай рекомендации.' },
        { role: 'user', content: `Анализируй это резюме: ${text.substring(0, 4000)}` } // Ограничь длину, если текст длинный
      ],
    },
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  )
}