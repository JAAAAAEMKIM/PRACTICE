import { Config } from "../world";

export interface Task {
  config: Config;
  init?: (ctx: CanvasRenderingContext2D) => void;
  runTick(ctx: CanvasRenderingContext2D, tick: number): void;
}
