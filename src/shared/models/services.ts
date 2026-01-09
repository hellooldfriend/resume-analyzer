import type { ServiceModel, ServiceType } from "../types";

type ServiceData = {
  url: string;
  model: ServiceModel;
  token: string;
}


export const serviceData: Record<ServiceType, ServiceData> = {
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
  gigachat: {
    url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
    model: 'GigaChat-2',
    token: import.meta.env.VITE_GIGACHAT_TOKEN_KEY,
  },
}