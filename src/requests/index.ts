import axios from 'axios';
import type { ServiceType, XAIv1ChatCompletion } from '../shared/types';
import { serviceData } from '../shared/models';


type AnalyzeCVRequestData = {
  type: ServiceType;
  text: string;
};

type AnalyzeCVRequestResponse = {
  data: XAIv1ChatCompletion;
}




export const analyzeCVRequest = async ({ type, text }: AnalyzeCVRequestData): Promise<AnalyzeCVRequestResponse> => {
  const service = serviceData[type];

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