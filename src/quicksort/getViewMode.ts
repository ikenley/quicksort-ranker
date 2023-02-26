import { ViewMode } from "../types";

const getViewMode = (originalArray: string[], finalList: string[]) => {
  if (!originalArray || originalArray.length === 0) {
    return ViewMode.Entry;
  } else if (!finalList || finalList.length === 0) {
    return ViewMode.Comparison;
  }
  return ViewMode.Result;
};

export default getViewMode;
