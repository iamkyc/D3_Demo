import React from 'react'
import { ResponsiveAppBar, BarChartContainer, PieChartContainer } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <div className="container">
        <BarChartContainer />
        <PieChartContainer />
      </div>
    </div>
  );
}

export default App;
