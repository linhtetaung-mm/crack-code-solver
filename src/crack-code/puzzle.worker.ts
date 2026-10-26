import { solveCode } from "./puzzle";
import type { Step } from "./puzzle";

self.onmessage = (event: MessageEvent<{ level: number; history: Step[] }>) => {
  self.postMessage(solveCode(event.data.level, event.data.history));
};
