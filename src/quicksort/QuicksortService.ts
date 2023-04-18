import React from "react";
import { Comparison, PromptComparisonType } from "../types";
import { Action } from "./QuicksortContext";

/** Service which implements quicksort algorithm.
 * See https://en.wikipedia.org/wiki/Quicksort
 */
export default class QuickSortService {
  // public async sort(
  //   array: string[],
  //   promptComparison: PromptComparisonType,
  //   complete: (list: string[]) => void
  // ) {
  //   console.log(`array=${JSON.stringify(array)}`);
  //   await this.quicksort(array, promptComparison, 0, array.length - 1);
  //   complete(array);
  // }

  /** Recursive quicksort */
  public async quicksort(
    array: string[],
    dispatch: React.Dispatch<Action>,
    promptComparison: PromptComparisonType,
    low: number,
    high: number
  ) {
    // Null condition- Return when endpoints cross
    if (low >= high || low < 0) {
      dispatch({ type: "popPartitions" });
      return;
    }

    const pivotIndex = await this.partition(array, promptComparison, low, high);

    // Make recursive calls on each side of the pivot
    const nextPartitions = [
      { low: low, high: pivotIndex - 1 }, // Left side of pivot
      { low: pivotIndex + 1, high }, // Right side of pivot
    ];
    console.log("nextPartitions", nextPartitions);

    dispatch({ type: "popPartitions" });
    dispatch({
      type: "pushPartitions",
      data: nextPartitions,
    });
    //await this.quicksort(array, promptComparison, low, pivotIndex - 1);
    //await this.quicksort(array, promptComparison, pivotIndex + 1, high);
  }

  /** Divide array into two partitions.
   * One partition contains elements less than or equal to the pivot.
   * The other partition contains elements greater than the pivot.
   */
  private async partition(
    array: string[],
    promptComparison: PromptComparisonType,
    low: number,
    high: number
  ) {
    // Choose a random pivot value
    this.selectPivot(array, low, high);
    const pivotValue = array[high];
    let pivotIndex = low;

    for (let i = low; i < high; i++) {
      const comparison: Comparison = {
        comparisonValue: array[i],
        pivotValue,
        array,
        low,
        high,
        pivotIndex,
      };
      const comparisonResult = await promptComparison(comparison);
      // If comparisonValue is less thann pivotValue, swap
      if (comparisonResult <= 0) {
        this.swap(array, pivotIndex, i);
        pivotIndex++;
      }
    }
    // Move pivot to pivot index
    this.swap(array, pivotIndex, high);
    return pivotIndex;
  }

  /** Randomly selects the pivot and swaps it to first position */
  private selectPivot(array: string[], low: number, high: number) {
    const partitionIndex = Math.floor(Math.random() * (high - low + 1) + low);
    this.swap(array, high, partitionIndex);
  }

  /* Swap two indexes in an array */
  private swap(array: string[], x: number, y: number) {
    const temp = array[x];
    array[x] = array[y];
    array[y] = temp;
  }

  private logState(
    message: string,
    array: number[],
    low: number,
    high: number
  ) {
    const state = { array, low, high };
    console.log(`${message}=${JSON.stringify(state)}`);
  }
}
