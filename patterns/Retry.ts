import { mockApi } from "./mockApi";

const retryCall = (fn, args, count) => {
  return new Promise(async (resolve, reject) => {
    let error = null;
    while (count) {
      try {
        console.log(`Trying API call. ${count} times left.`);
        const res = await fn(...args);
        return resolve(res);
      } catch (e) {
        count -= 1;
        error = e;
      }
    }
    reject(error);
  });
};

const main = async () => {
  let count = 1;
  for (let i = 0; i < count; i++) {
    retryCall(mockApi, [i, { isSuccessful: false }], 5).then(console.log);
  }
};

main();
