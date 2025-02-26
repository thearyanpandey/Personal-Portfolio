class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // This error is Mongoose Error when you try to Enter duplicate value in field of unique item
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `JSON token is expired, Try again !!`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `JSON token is expired, Try again !!`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Error
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Error handling 
  const errorMessage = err.errors
  ? Object.values(err.errors)
      .map((error) => error.message)
      .join(" ")
  : err.message;

console.log('Sending error response:', {   // Debug log
  success: false,
  message: errorMessage,
  statusCode: err.statusCode
});

return res.status(err.statusCode).json({
  success: false,
  message: errorMessage,
});
};

export default ErrorHandler;