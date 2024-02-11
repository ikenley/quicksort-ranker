import { createContext, useContext, useReducer, useEffect } from "react";
import { Comparison, defaultComparison, Item } from "../types";
import savedLists from "./savedLists";

type Partition = {
  low: number;
  high: number;
};

type QuickState = {
  initialList: Item[];
  comparison: Comparison;
  finalList: Item[];
  partitions: Partition[] | null;
};

const initialState: QuickState = {
  initialList: savedLists.cocktails,
  comparison: defaultComparison,
  finalList: [],
  partitions: null,
};

export type Action =
  | { type: "setInitialList"; data: Item[] }
  | { type: "setComparison"; data: Comparison }
  | { type: "setFinalList"; data: Item[] }
  | { type: "restore"; data: QuickState }
  | { type: "pushPartitions"; data: Partition[] }
  | { type: "popPartitions" }
  | { type: "reset" };

type Props = {
  children: React.ReactNode;
};

/** Core reducer logic */
const getState = (state: QuickState, action: Action): QuickState => {
  switch (action.type) {
    case "setInitialList": {
      return { ...state, initialList: action.data };
    }
    case "setComparison": {
      return { ...state, comparison: action.data };
    }
    case "setFinalList": {
      return { ...state, finalList: action.data };
    }
    case "pushPartitions": {
      const prevPartitions = state.partitions || [];
      const nextPartitions = [...prevPartitions, ...action.data];
      return { ...state, partitions: nextPartitions };
    }
    case "popPartitions": {
      const prevPartitions = state.partitions || [];
      const nextPartitions = [...prevPartitions];
      nextPartitions.pop();
      return { ...state, partitions: nextPartitions };
    }
    case "restore": {
      return action.data;
    }
    case "reset": {
      return { ...initialState };
    }
    default: {
      throw Error("Unknown action");
    }
  }
};

const STORAGE_KEY = "QUICKSORT_STATE";

const saveToLocalStorage = (state: QuickState) => {
  global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

/** Reducer which centralizes all non-trivial state management */
function quickReducer(state: QuickState, action: Action): QuickState {
  const nextState = getState(state, action);

  saveToLocalStorage(nextState);

  return nextState;
}

const QuickStateContext = createContext<QuickState>(initialState);

// Temp value to trick Typescript
const mockDis: any = null;
const QuickDispatchContext = createContext<React.Dispatch<Action>>(mockDis);

export function QuickProvider({ children }: Props) {
  const [quickState, dispatch] = useReducer(quickReducer, initialState);

  /** Attempt to fetch */
  useEffect(() => {
    const savedStateJson: string | null =
      global.localStorage.getItem(STORAGE_KEY);

    if (savedStateJson) {
      const savedState = JSON.parse(savedStateJson);
      dispatch({ type: "restore", data: savedState });
    }
  }, []);

  return (
    <QuickStateContext.Provider value={quickState}>
      <QuickDispatchContext.Provider value={dispatch}>
        {children}
      </QuickDispatchContext.Provider>
    </QuickStateContext.Provider>
  );
}

export function useQuickState() {
  return useContext(QuickStateContext);
}

export function useQuickDispatch() {
  return useContext(QuickDispatchContext);
}
