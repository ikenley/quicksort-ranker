export type Item = {
  value: string;
  img: string | null;
};

export type Comparison = {
  comparisonValue: Item;
  pivotValue: Item;
  array: Item[];
  low: number;
  high: number;
  pivotIndex: number;
};

export const defaultComparison: Comparison = {
  comparisonValue: { value: "", img: null },
  pivotValue: { value: "", img: null },
  array: [],
  low: 0,
  high: 0,
  pivotIndex: 0,
};

export type PromptComparisonType = (
  nextComparison: Comparison
) => Promise<-1 | 1>;

export enum ViewMode {
  Entry,
  Comparison,
  Result,
}
