import { Comparison } from "../types";

type Props = {
  comparison: Comparison;
};

/** Display panel for Comparison */
const ComparisonList = ({ comparison }: Props) => {
  const {
    comparisonValue,
    pivotValue,
    array,
    low,
    high,
    pivotIndex,
  } = comparison;
  return (
    <div className="comparison-list">
      <ul>
        {array.map((item, ix) => (
          <li key={item}>
            {item} {ix === low && <code>low</code>}{" "}
            {ix === high && <code>high</code>}{" "}
            {ix === pivotIndex && <code>pivotIndex</code>}{" "}
            {item === comparisonValue && <code>comparisonValue</code>}{" "}
            {item === pivotValue && <code>pivotValue</code>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparisonList;
