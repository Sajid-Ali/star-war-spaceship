import "./App.css";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Spaceships from "./containers/Spaceships";
import SpaceshipDetail from "./containers/SpaceshipDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Spaceships />} />
        <Route path="details" element={<SpaceshipDetail />} />
      </Routes>
    </div>
  );
}

export default App;
