import bcrypt from 'bcrypt';
import {
  IChangePassword,
  IForgetPassword,
  ILoginUser,
  IRegisterUser,
  IResetPassword,
} from '../interfaces/auth';
import config from '../config';
import prisma from '../utils/prisma';
import AppError from '../errors/AppError';
import { TokenType, createJwtToken, verifyJwtToken } from '../utils/jwtToken';
import { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail';

const registerUser = async (data: IRegisterUser) => {
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds),
  );

  if (await prisma.user.findUnique({ where: { username: data.username } })) {
    throw new AppError(400, 'This username is not available, try unique');
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { confirmPassword, ...userData } = { ...data };

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      bio: true,
      photoURL: true,
      dateOfBirth: true,
      address: true,
      createdAt: true,
    },
  });
  return result;
};

const loginUser = async (data: ILoginUser) => {
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  if (!(await bcrypt.compare(data.password, user.password))) {
    throw new AppError(400, "Password does't match!");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      lastLoginAt: new Date().toISOString(),
    },
  });

  const payload = {
    id: user.id,
    username: user.username,
  };

  const access_token = createJwtToken(payload, TokenType.accessToken);

  const refresh_token = createJwtToken(payload, TokenType.refreshToken);

  return { access_token, refresh_token };
};

const refreshToken = async (token: string) => {
  let decodeUser;
  try {
    decodeUser = verifyJwtToken(token, TokenType.refreshToken);
  } catch (error) {
    throw new AppError(403, 'Invalid Token');
  }

  const user = await prisma.user.findUnique({ where: { id: decodeUser.id } });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const accessToken = createJwtToken(payload, TokenType.accessToken);

  return { access_token: accessToken };
};

const changePassword = async (user: JwtPayload, data: IChangePassword) => {
  const currentUser = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
  });

  if (!(await bcrypt.compare(data.currentPassword, currentUser.password))) {
    throw new AppError(400, "Current Password does't match!");
  }

  data.newPassword = await bcrypt.hash(
    data.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      password: data.newPassword,
    },
  });

  return null;
};

const forgotPassword = async (data: IForgetPassword) => {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = createJwtToken(payload, TokenType.accessToken, '10m');

  const resetUi = `${config.reset_pass_ui_link}?token=${token}`;

  const html = `<html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
      }
      .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h2 {
          color: #333;
      }
      p {
          color: #666;
          line-height: 1.6;
      }
      .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.3s;
      }
      .button:hover {
          background-color: #0056b3;
      }
  </style>
  </head>
  <body>
  <div class="container">
      <h2>Reset Your Password</h2>
      <p>Dear User,</p>
      <p>Please click the button below to reset your password.</p>
      <a href="${resetUi}" class="button">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email. This link will expire in 10 minutes.</p>
      <p>Regards,<br>Your Website Team</p>
  </div>
  </body>
  </html>`;

  await sendEmail(user.email, html);

  return null;
};

const resetPassword = async (data: IResetPassword) => {
  let decodeUser;
  try {
    decodeUser = verifyJwtToken(data.token, TokenType.accessToken);
  } catch (error) {
    throw new AppError(403, 'Invalid Token');
  }

  const user = await prisma.user.findUnique({ where: { id: decodeUser.id } });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  data.newPassword = await bcrypt.hash(
    data.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: data.newPassword,
    },
  });

  return null;
};

const authServices = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
export default authServices;
