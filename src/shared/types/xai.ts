export type XAIv1ChatCompletion = {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string; // 'grok-4-0709'
  choices: XAIChatCompletionChoice[];
  usage: XAIChatCompletionUsage;
  system_fingerprint: string;
}

export type XAIChatCompletionChoice = {
  index: number;
  message: {
    role: 'assistant';
    content: string;
    refusal: null;
  },
  finish_reason: 'stop';
}

export type XAIChatCompletionUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: {
    text_tokens: number;
    audio_tokens: number;
    image_tokens: number;
    cached_tokens: number;
  },
  completion_tokens_details: {
    reasoning_tokens: number;
    audio_tokens: number;
    accepted_prediction_tokens: number;
    rejected_prediction_tokens: number;
  },
  num_sources_used: number;
}
