import { useEffect, useRef } from "react";
import { Task } from "../tasks/Task";

export interface Config {
  tick: number;
  width: number;
  height: number;
}

interface Props {
  config: Config;
  task: Task;
}

// Task를 browser에 그리는 역할
const World = ({ config, task }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // start workloop
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    const interval = setInterval(() => {
      if (!ctx) return;

      task.runTick(ctx, config.tick);
    }, config.tick);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas width={config.width} height={config.height} ref={canvasRef}>
      Canvas Not Supported.
    </canvas>
  );
};

export default World;
