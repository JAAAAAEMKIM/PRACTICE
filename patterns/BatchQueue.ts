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
    }, this.timeout);
  }

  flush() {
    clearTimeout(this.timeoutId);
    this.timeoutId = undefined;
    console.log(this.buffer.map(([__, args]) => args));
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

const batch = new Batch(10, 100);

const batchCall = <A extends Array<unknown>, Return>(
  fn: (...args: A) => Return,
  ...args: A
): Promise<Return> => {
  return new Promise((resolve) => {
    batch.push(fn, args, resolve);
  });
};

const main = async () => {
  let count = 300;
  for (let i = 0; i < count; i++) {
    const t = setTimeout(() => {
      batchCall(mockApi, i).then(console.log);
      clearTimeout(t);
    }, Math.random() * 50);
  }
};

main();
