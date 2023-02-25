import { useEffect, useState } from "react";
import QuicksortService from "./QuicksortService";

const quicksortService = new QuicksortService();
const originalArray = [5, 8, 6, 7, 3, 4, 2, 9, 10, 1];

const QuicksortPage = () => {
  const [array, setArray] = useState<number[]>(originalArray);

  useEffect(() => {
    const arrayClone = [...originalArray];
    quicksortService.sort(arrayClone);
    setArray([...arrayClone]);
  }, [setArray]);

  return (
    <div className="quicksort-page">
      Open the pod bay doors, HAL
      <div>Original array: {JSON.stringify(originalArray)}</div>
      <div>Sorted array: {JSON.stringify(array)}</div>
    </div>
  );
};

export default QuicksortPage;
