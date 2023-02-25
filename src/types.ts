export type Comparison = {
  comparisonValue: string;
  pivotValue: string;
  array: string[];
  low: number;
  high: number;
  pivotIndex: number;
};

export const defaultComparison: Comparison = {
  comparisonValue: "",
  pivotValue: "",
  array: [],
  low: 0,
  high: 0,
  pivotIndex: 0,
};

export type PromptComparisonType = (
  nextComparison: Comparison
) => Promise<-1 | 1>;
