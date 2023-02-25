/** Service which implements quicksort algorithm.
 * See https://en.wikipedia.org/wiki/Quicksort
 */
export default class QuickSortService {
  public sort(array: number[]) {
    console.log(`array=${JSON.stringify(array)}`);
    this.quicksort(array, 0, array.length - 1);
  }

  /** Recursive quicksort */
  private quicksort(array: number[], low: number, high: number) {
    // Null condition- Return when endpoints cross
    if (low >= high || low < 0) {
      return;
    }

    const pivotIndex = this.partition(array, low, high);

    // Make recursive calls on each side of the pivot
    this.quicksort(array, low, pivotIndex - 1); // Left side of pivot
    this.quicksort(array, pivotIndex + 1, high); // Right side of pivot
  }

  /** Divide array into two partitions.
   * One partition contains elements less than or equal to the pivot.
   * The other partition contains elements greater than the pivot.
   */
  private partition(array: number[], low: number, high: number) {
    // Choose a random pivot value
    this.selectPivot(array, low, high);
    const pivotValue = array[high];
    let pivotIndex = low;

    for (let i = low; i < high; i++) {
      if (array[i] <= pivotValue) {
        this.swap(array, pivotIndex, i);
        pivotIndex++;
      }
    }
    // Move pivot to pivot index
    this.swap(array, pivotIndex, high);
    return pivotIndex;
  }

  /** Randomly selects the pivot and swaps it to first position */
  private selectPivot(array: number[], low: number, high: number) {
    const partitionIndex = Math.floor(Math.random() * (high - low + 1) + low);
    this.swap(array, high, partitionIndex);
  }

  /* Swap two indexes in an array */
  private swap(array: number[], x: number, y: number) {
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
