import React from 'react';
import mammoth from 'mammoth';
import { extractTextFromPDF } from '../../shared/utils';
import { analyzeCVRequest } from '../../requests';

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
        text = await extractTextFromPDF(file)
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.doc')) {

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

  const analyzeResume = async (text: string) => {
    const response = await analyzeCVRequest({
      type: 'gigachat',
      text,
    })

    return response.data.choices[0].message.content;
  };

  return (
    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
  );
}

export default ResumeUploader;