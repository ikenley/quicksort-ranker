import { createContext, useContext, useReducer } from "react";
import { Comparison, defaultComparison } from "../types";

type QuickState = {
  initialList: string[];
  comparison: Comparison;
  finalList: string[];
};

const initialState: QuickState = {
  initialList: [],
  comparison: defaultComparison,
  finalList: [],
};

type Action =
  | { type: "setInitialList"; data: string[] }
  | { type: "setComparison"; data: Comparison }
  | { type: "setFinalList"; data: string[] }
  | { type: "reset" };

type Props = {
  children: React.ReactNode;
};

function quickReducer(state: QuickState, action: Action): QuickState {
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
    case "reset": {
      return { ...initialState };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}

const QuickStateContext = createContext<QuickState>(initialState);

// Temp value to trick Typescript
const mockDis: any = null;
const QuickDispatchContext = createContext<React.Dispatch<Action>>(mockDis);

export function QuickProvider({ children }: Props) {
  const [quickState, dispatch] = useReducer(quickReducer, initialState);

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
