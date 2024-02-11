import { Comparison } from "../types";

type Props = {
  comparison: Comparison;
};

/** Display panel for Comparison */
const ComparisonList = ({ comparison }: Props) => {
  const { comparisonValue, pivotValue, array, low, high, pivotIndex } =
    comparison;
  return (
    <div className="comparison-list">
      <ul>
        {array.map((item, ix) => (
          <li key={item.value}>
            {item.value} {ix === low && <code>low</code>}{" "}
            {ix === high && <code>high</code>}{" "}
            {ix === pivotIndex && <code>pivotIndex</code>}{" "}
            {item.value === comparisonValue.value && (
              <code>comparisonValue</code>
            )}{" "}
            {item.value === pivotValue.value && <code>pivotValue</code>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparisonList;
