/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { ZodError } from 'zod';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let error = err;

  if (err instanceof ZodError) {
    const result = handleZodError(err);
    statusCode = result?.statusCode;
    message = result?.message;
    error = result?.error;
  } else if (err instanceof PrismaClientValidationError) {
    message = 'MyError: ' + err.message;
    console.log(err);
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
