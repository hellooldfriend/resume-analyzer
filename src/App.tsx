import React from 'react';
import './App.css'
import AnalysisResult from './components/AnalysisResult/AnalysisResult'
import ResumeUploader from './components/ResumeUploader/ResumeUploader'

function App() {

  const [_, setResumeText] = React.useState<string | null>(null);
  const [analysisText, setAnalysisText] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);


  return (
    <>
      <h1>Анализатор резюме</h1>
      <ResumeUploader
        onResumeTextChange={setResumeText}
        onLoadingChange={setIsLoading}
        onAnalyseChange={setAnalysisText}
        onErrorChange={setError}
      />

      {isLoading && <p>Анализ в процессе...</p>}
      {error && <p>Ошибка: {error}</p>}
      {analysisText && <AnalysisResult value={analysisText} />}
    </>
  )
}

export default App
