import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export const TokenType: {
  accessToken: 'access_token';
  refreshToken: 'refresh_token';
} = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
};

type TTokenType = 'access_token' | 'refresh_token';

export const createJwtToken = (
  payload: { id: string; username: string },
  tokenType: TTokenType,
  expiresIn?: string,
) => {
  if (tokenType === TokenType.accessToken) {
    return jwt.sign(payload, config.jwt_access_secret as string, {
      expiresIn: expiresIn || config.jwt_access_expires_in,
    });
  }
  if (tokenType === TokenType.refreshToken) {
    return jwt.sign(payload, config.jwt_refresh_secret as string, {
      expiresIn: expiresIn || config.jwt_refresh_expires_in,
    });
  }
};

export const verifyJwtToken = (token: string, tokenType: TTokenType) => {
  let decode;
  if (tokenType === TokenType.accessToken) {
    decode = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
  }

  if (tokenType === TokenType.refreshToken) {
    decode = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
  }

  return decode as JwtPayload;
};
