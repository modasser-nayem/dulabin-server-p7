import { RequestHandler } from 'express';
import authServices from '../services/auth';
import sendResponse from '../utils/sendResponse';
import catchAsync from '../utils/catchAsync';

const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.registerUser(req.body);

  sendResponse(res, {
    code: 201,
    success: true,
    message: 'Account created Success',
    data: result,
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully Login',
    data: result,
  });
});

const authControllers = { registerUser, loginUser };
export default authControllers;
