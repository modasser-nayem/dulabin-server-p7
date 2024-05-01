import bcrypt from 'bcrypt';
import { ILoginUser, IRegisterUser } from '../interfaces/auth';
import config from '../config';
import prisma from '../utils/prisma';
import AppError from '../errors/AppError';
import { TokenType, createJwtToken } from '../utils/jwtToken';

const registerUser = async (data: IRegisterUser) => {
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds),
  );

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

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = createJwtToken(payload, TokenType.accessToken);

  return { access_token: token };
};

const authServices = { registerUser, loginUser };
export default authServices;
