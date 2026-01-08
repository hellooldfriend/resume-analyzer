

type Props = {
  value: string;
}

const AnalysisResult = ({ value }: Props) => {
  return (
    <div>
      <h2>Результат анализа</h2>
      {value}
    </div>
  )
}

export default AnalysisResult;