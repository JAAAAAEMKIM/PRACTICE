import { useRef } from "react";
import "./App.css";
import World, { Config } from "./world";
import DropObjects from "./tasks/DropObjects";
import ElasticCollision from "./engine/collisions/ElasticCollision";

const config: Config = {
  tick: 16,
  width: 1200,
  height: 800,
};

function App() {
  const collision = useRef(new ElasticCollision());
  const dropObjects = useRef(new DropObjects(config, collision.current, 10));
  // const rectangleCollision = useRef(new RectangleCollision(uiState.current));

  return <World config={config} task={dropObjects.current} />;
}

export default App;
