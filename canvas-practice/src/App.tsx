import { useRef } from "react";
import "./App.css";
import World from "./components/World";
import UiState from "./states/UiState";
import RectangleCollision from "./tasks/RectangleCollision";
import DropSquare from "./tasks/DropSquare";

function App() {
  const uiState = useRef(new UiState(800, 1200));
  const rectangleCollision = useRef(new RectangleCollision(uiState.current));
  const dropSquare = useRef(new DropSquare(uiState.current));

  return <World uiState={uiState.current} task={dropSquare.current} />;
}

export default App;
