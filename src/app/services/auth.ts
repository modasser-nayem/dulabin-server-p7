import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
import { IRegisterUser } from '../interfaces/auth';
import config from '../config';

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

const authServices = { registerUser };
export default authServices;
