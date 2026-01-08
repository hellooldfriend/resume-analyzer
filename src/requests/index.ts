import axios from 'axios';
import type { XAIv1ChatCompletion } from '../shared/types';

type ServiceType = 'xai' | 'openai';
type ServiceModel = 'grok-beta' | 'gpt-4.1-mini';

type AnalyzeCVRequestData = {
  type: ServiceType;
  text: string;
};

type AnalyzeCVRequestResponse = {
  data: XAIv1ChatCompletion;
}

type ServiceData = {
  url: string;
  model: ServiceModel;
  token: string;
}

const serviceData: Record<ServiceType, ServiceData> = {
  xai: {
    url: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-beta',
    token: import.meta.env.VITE_X_AI_TOKEN_KEY,
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4.1-mini',
    token: import.meta.env.VITE_OPEN_AI_TOKEN_KEY,
  },
}


export const analyzeCVRequest = async ({ type, text }: AnalyzeCVRequestData): Promise<AnalyzeCVRequestResponse> => {
  const service = serviceData[type];

  console.log('xxx', service, type);


  if (!service) {
    console.error('Не удалось определить сервис');
    return Promise.reject();
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
    { headers: { 'Authorization': `Bearer ${service.token}` } }
  )
}