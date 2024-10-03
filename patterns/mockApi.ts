interface mockOptions {
  returnValue?: any;
}

export const mockApi = (payload: any, { returnValue }: mockOptions = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(payload);
      },
      10 + Math.random() * 100,
    );
  });
};
