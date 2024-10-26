export interface Task {
  init?: (ctx: CanvasRenderingContext2D) => void;
  runTick(ctx: CanvasRenderingContext2D, tick: number): void;
}
