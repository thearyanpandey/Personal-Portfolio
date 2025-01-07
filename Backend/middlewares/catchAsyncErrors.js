export const catchAsyncErrors = (someFunction) => {
  return (req, res, next) => {
    Promise.resolve(someFunction(req, res, next)).catch(next);
  };
};
