import { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import prisma from '../utils/prisma';
import { IUpdateMyProfile } from '../interfaces/user';

const getMyProfile = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
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
      updatedAt: true,
      lastLoginAt: true,
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return result;
};

const getUserProfile = async (username: string) => {
  const result = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      photoURL: true,
      dateOfBirth: true,
      address: true,
      createdAt: true,
      posts: {
        where: {
          privacy: 'public',
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          mediaURL: true,
        },
      },
    },
  });

  if (!result) {
    throw new AppError(404, 'User not found!');
  }

  return result;
};

const updateMyProfile = async (user: JwtPayload, data: IUpdateMyProfile) => {
  const result = await prisma.user.update({
    where: { id: user.id },
    data: data,
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
      updatedAt: true,
      lastLoginAt: true,
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      photoURL: true,
      dateOfBirth: true,
      address: true,
      createdAt: true,
    },
  });

  return result;
};

const userServices = {
  getMyProfile,
  getUserProfile,
  updateMyProfile,
  getAllUsers,
};
export default userServices;
