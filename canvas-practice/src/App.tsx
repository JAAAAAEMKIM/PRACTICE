import { useRef } from "react";
import "./App.css";
import World from "./components/World";
import UiState from "./states/UiState";
import RectangleCollision from "./tasks/RectangleCollision";
import DropObjects from "./tasks/DropObjects";

const BASE_TICK = 16;

function App() {
  const uiState = useRef(new UiState(800, 1200));
  // const rectangleCollision = useRef(new RectangleCollision(uiState.current));
  const dropObjects = useRef(new DropObjects(uiState.current, BASE_TICK));

  return (
    <World
      uiState={uiState.current}
      task={dropObjects.current}
      tick={BASE_TICK}
    />
  );
}

export default App;
