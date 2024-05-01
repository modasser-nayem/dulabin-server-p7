import { RequestHandler } from 'express';
import authServices from '../services/auth';
import sendResponse from '../utils/sendResponse';
import catchAsync from '../utils/catchAsync';
import config from '../config';

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

  res.cookie('refresh_token', result.refresh_token, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully Login',
    data: { access_token: result.access_token },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refresh_token } = req.cookies;
  const result = await authServices.refreshToken(refresh_token);

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.changePassword(req.user, req.body);

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully change password',
    data: result,
  });
});

const forgotPassword: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.forgotPassword(req.body);

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Check your email to reset password',
    data: result,
  });
});

const resetPassword: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.resetPassword(req.body);

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully Reset your password',
    data: result,
  });
});

const authControllers = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
export default authControllers;
