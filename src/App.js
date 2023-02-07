import React from 'react'
import { ResponsiveAppBar, BarChartContainer } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <div className="container">
        <BarChartContainer />
      </div>
    </div>
  );
}

export default App;
