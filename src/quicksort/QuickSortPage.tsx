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
  const { initialList, comparison, finalList, partitions } = quickState;
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

  // If initial list is ready, begin quicksorting
  // "Begin" means to push entire array as first quicksort partition
  useEffect(() => {
    if (initialList && initialList.length && partitions === null) {
      dispatch({
        type: "pushPartitions",
        data: [{ low: 0, high: initialList.length - 1 }],
      });
    }
  }, [initialList, dispatch, partitions]);

  // Respond to the partitions list changing
  useEffect(() => {
    if (partitions !== null) {
      // If stack still contains partitions, quicksort the next one
      if (partitions.length > 0) {
        const sortPartition = async () => {
          const partition = partitions[partitions.length - 1];
          const { low, high } = partition;

          await quicksortService.quicksort(
            initialList,
            dispatch,
            promptComparison,
            low,
            high
          );
        };
        sortPartition();
      }
      // Else mark as completed
      else {
        dispatch({ type: "setFinalList", data: [...initialList] });
      }
    }
  }, [initialList, partitions, promptComparison, dispatch, quickState]);

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
