import { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { TokenType, verifyJwtToken } from '../utils/jwtToken';
import prisma from '../utils/prisma';

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = verifyJwtToken(token, TokenType.accessToken);

    const { id } = decoded;

    // checking if the user is exist
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
