type Props = {
  finalList: string[];
};

const ResultPanel = ({ finalList }: Props) => {
  const list = [...finalList].reverse();

  return (
    <div className="result-panel">
      <h2>Rankings</h2>
      <ol>
        {list.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ol>
    </div>
  );
};

export default ResultPanel;
