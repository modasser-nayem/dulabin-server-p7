import { Response } from 'express';

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  code: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.code).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
