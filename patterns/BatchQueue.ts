class Batch {
  private buffer: Array<any> = [];
  private maxSize: number;
  private timeout: number;
  private timeoutId: number | undefined;

  constructor(maxSize: number, timeout: number) {
    this.maxSize = maxSize;
    this.timeout = timeout;
    this.timeoutId = undefined;
  }

  push(fn, args, resolve) {
    this.buffer.push([fn, args, resolve]);

    if (this.buffer.length === this.maxSize) {
      this.flush();
      return;
    }
    if (this.timeoutId) return;

    this.timeoutId = setTimeout(() => {
      this.flush();
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }, this.timeout);
  }

  flush() {
    while (this.buffer.length) {
      const [fn, args, resolve] = this.buffer.shift();
      const promise = fn(...args);
      promise.then(resolve);
    }
  }
}

interface mockOptions {
  returnValue?: any;
}

const mockApi = (payload: any, { returnValue }: mockOptions = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(payload);
      },
      10 + Math.random() * 100,
    );
  });
};

const batch = new Batch(3, 1000);

const batchCall = <A extends Array<unknown>, Return>(
  fn: (...args: A) => Return,
  ...args: A
): Promise<Return> => {
  return new Promise((resolve) => {
    batch.push(fn, args, resolve);
  });
};

const main = async () => {
  let count = 20;
  for (let i = 0; i < count; i++) {
    batchCall(mockApi, i).then(console.log);
  }
};

main();
