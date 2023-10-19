import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (accessToken: string, secret: Secret): JwtPayload => {
  return jwt.verify(accessToken, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
