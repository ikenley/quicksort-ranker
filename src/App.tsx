import React from "react";
import QuicksortPage from "./quicksort/QuickSortPage";
import { QuickProvider } from "./quicksort/QuicksortContext";

function App() {
  return (
    <div className="app">
      <QuickProvider>
        <QuicksortPage />
      </QuickProvider>
    </div>
  );
}

export default App;
