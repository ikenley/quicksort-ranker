import { useCallback } from "react";
import { Comparison } from "../types";
import ComparisonList from "./ComparisonList";
import HeadToHeadPane from "./HeadToHeadPane";

type Props = {
  comparison: Comparison;
  handleClick: (isLessThanPivot: boolean) => void;
};

/** Display panel for Comparison */
const ComparisonPanel = ({ comparison, handleClick }: Props) => {
  const handleLessThan = useCallback(() => {
    handleClick(false);
  }, [handleClick]);

  const handleGreaterThan = useCallback(() => {
    handleClick(true);
  }, [handleClick]);

  return (
    <div className="comparison-panel">
      <div className="head-to-head p-3 row">
        <div className="col-sm">
          <HeadToHeadPane
            item={comparison.comparisonValue}
            handleClick={handleLessThan}
          />
        </div>
        <div className="col-sm">
          <HeadToHeadPane
            item={comparison.pivotValue}
            handleClick={handleGreaterThan}
          />
        </div>
      </div>
      <hr />
      <ComparisonList comparison={comparison} />
    </div>
  );
};

export default ComparisonPanel;
