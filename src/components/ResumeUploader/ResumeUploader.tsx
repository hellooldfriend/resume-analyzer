import React from 'react';
import axios from 'axios';
import mammoth from 'mammoth';

type Props = {
  onResumeTextChange: (value: string | null) => void;
  onAnalyseChange: (value: string | null) => void;
  onLoadingChange: (value: boolean) => void;
  onErrorChange: (value: string | null) => void;
}

const ResumeUploader = ({
  onResumeTextChange,
  onAnalyseChange,
  onLoadingChange,
  onErrorChange
}: Props) => {



  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onLoadingChange(true);
    onErrorChange(null);
    onAnalyseChange(null);

    try {
      let text = '';
      if (file.type === 'application/pdf') {
        console.log('получил PDF')
        // const arrayBuffer = await file.arrayBuffer();
        // const pdfData = await PDFParse(arrayBuffer);
        // text = pdfData.text;
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.doc')) {
        console.log('получил DOC')

        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        throw new Error('Поддерживаются только PDF и DOC/DOCX');
      }

      onResumeTextChange(text);
      const analysisResult = await analyzeResume(text);
      onAnalyseChange(analysisResult);
    } catch (err) {
      onErrorChange((err as Error).message);
    } finally {
      onLoadingChange(false);
    }
  };

  const analyzeResume = async (text: string): Promise<string> => {
    const API_KEY = import.meta.env.VITE_X_AI_TOKEN_KEY;
    console.log('>>>>', API_KEY);

    const response = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-beta', // Или актуальная модель, проверь docs
        messages: [
          { role: 'system', content: 'Ты анализатор резюме. Выдели ключевые навыки, опыт, слабые места и дай рекомендации.' },
          { role: 'user', content: `Анализируй это резюме: ${text.substring(0, 4000)}` } // Ограничь длину, если текст длинный
        ],
      },
      { headers: { 'Authorization': `Bearer ${API_KEY}` } }
    );
    return response.data.choices[0].message.content;
  };

  return (
    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
  );
}

export default ResumeUploader;