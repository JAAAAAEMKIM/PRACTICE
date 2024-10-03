import { mockApi } from "./mockApi";

class Queue {
  private queue: any[] = [];
  private processing = false;
  private token = null;

  process(fn, args, resolve) {
    this.queue.push([fn, args, resolve]);
    this.processQueue();
  }
  private async processQueue() {
    if (this.processing) return;
    if (this.queue.length === 0) return;

    this.processing = true;
    const [fn, args, resolve] = this.queue.shift();
    const result = await fn(...args);
    resolve(result);
    this.processing = false;
    this.processQueue();
  }
}

const buffer = new Queue();

const sequentialCall = (fn, args) => {
  return new Promise((resolve) => {
    buffer.process(fn, args, resolve);
  });
};

const main = async () => {
  let count = 300;
  for (let i = 0; i < count; i++) {
    sequentialCall(mockApi, i).then(console.log);
  }
};

main();
