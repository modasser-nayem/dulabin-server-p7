/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  const statusCode = 500;
  const message = 'Something went wrong!';

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
