import { useEffect, useRef } from "react";
import UiState from "../states/UiState";
import { Task } from "../tasks/Task";

interface Props {
  uiState: UiState;
  task: Task;
  tick?: number;
}

const World = ({ uiState, task, tick = 16 }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // start workloop
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    const interval = setInterval(() => {
      if (!ctx) return;

      task.runTick(ctx, tick);
    }, tick);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas width={uiState.width} height={uiState.height} ref={canvasRef}>
      Canvas Not Supported.
    </canvas>
  );
};

export default World;
