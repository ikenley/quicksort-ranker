import { Item } from "../types";

type Props = {
  finalList: Item[];
};

const ResultPanel = ({ finalList }: Props) => {
  const list = [...finalList].reverse();

  return (
    <div className="result-panel">
      <h2>Rankings</h2>
      <ol>
        {list.map((i) => (
          <li key={i.value}>{i.value}</li>
        ))}
      </ol>
    </div>
  );
};

export default ResultPanel;
