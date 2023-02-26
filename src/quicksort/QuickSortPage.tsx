import { useEffect, useState, useCallback, useRef } from "react";
import { Comparison, defaultComparison, ViewMode } from "../types";
import Navbar from "../shared/Navbar";
import getViewMode from "./getViewMode";
import QuicksortService from "./QuicksortService";
import EntryPanel from "./entry/EntryPanel";
import ComparisonPanel from "./ComparisonPanel";
import ResultPanel from "./ResultPanel";

const quicksortService = new QuicksortService();

const QuicksortPage = () => {
  const [initialList, setInitialList] = useState<string[]>([]);
  const [comparison, setComparison] = useState<Comparison>(defaultComparison);
  const resolver = useRef<(value: 1 | -1 | PromiseLike<1 | -1>) => void>();
  const [finalList, setFinalList] = useState<string[]>([]);

  const promptComparison = useCallback(
    (nextComparison: Comparison) => {
      setComparison(nextComparison);
      return new Promise<-1 | 1>((resolve, reject) => {
        resolver.current = resolve;
      });
    },
    [setComparison]
  );

  const complete = useCallback(
    (list: string[]) => {
      setFinalList(list);
    },
    [setFinalList]
  );

  const handleClick = useCallback((isLessThanPivot: boolean) => {
    if (resolver.current) {
      const resolve = resolver.current;
      isLessThanPivot ? resolve(-1) : resolve(1);
    }
  }, []);

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
          <EntryPanel setInitialList={setInitialList} />
        ) : viewMode === ViewMode.Comparison ? (
          <ComparisonPanel comparison={comparison} handleClick={handleClick} />
        ) : (
          <ResultPanel finalList={finalList} />
        )}
      </div>
    </div>
  );
};

export default QuicksortPage;
