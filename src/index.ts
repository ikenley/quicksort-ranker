import QuickSortService from "./QuicksortService";

const quickSortService = new QuickSortService();
const array = [5, 8, 6, 7, 3, 4, 2, 9, 10, 1];
quickSortService.sort(array);
console.log(`final_array=${JSON.stringify(array)}`);
