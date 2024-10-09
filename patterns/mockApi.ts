interface mockOptions {
  returnValue?: any;
  isSuccessful?: boolean;
}

export const mockApi = (
  payload: any,
  { returnValue, isSuccessful = true }: mockOptions = {},
) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        isSuccessful ? resolve(payload) : reject(new Error("API ERROR"));
      },
      10 + Math.random() * 100,
    );
  });
};
