import { ZodError, ZodIssue } from 'zod';
import { TErrors, TGenericErrorResponse } from '../interfaces/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errors: TErrors = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode: statusCode,
    message: err.issues[0].message,
    error: errors,
  };
};

export default handleZodError;
