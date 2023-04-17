import { useEffect, useCallback, useRef } from "react";
import { Comparison, ViewMode } from "../types";
import Navbar from "../shared/Navbar";
import getViewMode from "./getViewMode";
import QuicksortService from "./QuicksortService";
import EntryPanel from "./entry/EntryPanel";
import ComparisonPanel from "./ComparisonPanel";
import ResultPanel from "./ResultPanel";
import { useQuickState, useQuickDispatch } from "./QuicksortContext";

const quicksortService = new QuicksortService();

const QuicksortPage = () => {
  const quickState = useQuickState();
  const { initialList, comparison, finalList } = quickState;

  const dispatch = useQuickDispatch();
  const resolver = useRef<(value: 1 | -1 | PromiseLike<1 | -1>) => void>();

  const promptComparison = useCallback(
    (nextComparison: Comparison) => {
      dispatch({ type: "setComparison", data: nextComparison });
      return new Promise<-1 | 1>((resolve, reject) => {
        resolver.current = resolve;
      });
    },
    [dispatch]
  );

  const complete = useCallback(
    (list: string[]) => {
      dispatch({ type: "setFinalList", data: list });
    },
    [dispatch]
  );

  const handleClick = useCallback((isLessThanPivot: boolean) => {
    if (resolver.current) {
      const resolve = resolver.current;
      isLessThanPivot ? resolve(-1) : resolve(1);
    }
  }, []);

  const confirmReset = useCallback(() => {
    const shouldReset = global.confirm("Are you sure you want to reset?");
    if (shouldReset) {
      dispatch({ type: "reset" });
    }
  }, [dispatch]);

  useEffect(() => {
    if (initialList && initialList.length) {
      quicksortService.sort(initialList, promptComparison, complete);
    }
  }, [initialList, promptComparison, complete]);

  const viewMode = getViewMode(initialList, finalList);

  return (
    <div className="quicksort-page">
      <Navbar />
      <div className="container">
        {viewMode === ViewMode.Entry ? (
          <EntryPanel />
        ) : viewMode === ViewMode.Comparison ? (
          <ComparisonPanel comparison={comparison} handleClick={handleClick} />
        ) : (
          <ResultPanel finalList={finalList} />
        )}
        <button
          type="button"
          className="btn btn-secondary btn-block mt-5"
          onClick={confirmReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default QuicksortPage;
