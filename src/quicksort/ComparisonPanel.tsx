import { Comparison } from "../types";
import ComparisonList from "./ComparisonList";

type Props = {
  comparison: Comparison;
  handleClick: (isLessThanPivot: boolean) => void;
};

/** Display panel for Comparison */
const ComparisonPanel = ({ comparison, handleClick }: Props) => {
  return (
    <div className="comparison-panel">
      <div className="head-to-head p-3">
        <div>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={() => {
              handleClick(false);
            }}
          >
            {comparison.comparisonValue.value}
          </button>
        </div>
        <div className="my-1 text-center">vs</div>
        <div>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={() => {
              handleClick(true);
            }}
          >
            {comparison.pivotValue.value}
          </button>
        </div>
      </div>
      <hr />
      <ComparisonList comparison={comparison} />
    </div>
  );
};

export default ComparisonPanel;
