import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'config';
import { TOTPSecret } from '../models/OTPs';
import { User } from '../models/User';

dotenv.config();

// Set JWT algorithm and secret key
const jwtAlgorithm = 'HS256';
const jwtSecret = process.env.JWT_SECRET;

// Set refresh token expiration in minutes
const refreshExpiration = 604800; // 1 week (604800 minutes)

interface JWTPayload {
  subject: string;
  roles: string[];
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

const createAccessToken = (subject: string, roles: string[]): string => {
  const payload: JWTPayload = { subject, roles };
  const accessToken = jwt.sign(payload, jwtSecret, {
    algorithm: jwtAlgorithm,
    expiresIn: '1h',
  });
  return accessToken;
};

const createRefreshToken = (): string => {
  const refreshToken = uuidv4();
  return refreshToken;
};

const validateAccessToken = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    // Check if decoded payload is valid
    delete decoded.iat;
    delete decoded.exp;
    if (decoded) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const generateTokenPair = async (user: User): Promise<TokenPair> => {
  const subject = user.id.toString();
  const roles = user.roles || [];

  const refreshToken = createRefreshToken();
  await TOTPSecret.update({ user_id: subject, secret: refreshToken }, { upsert: true });

  const accessToken = createAccessToken(subject, roles);
  const tokenPair: TokenPair = {
    accessToken,
    refreshToken,
  };

  return tokenPair;
};

interface TokenValidationResponse {
  isValid: boolean;
}

const validateTokens = async (accessToken: string, refreshToken: string): Promise<TokenValidationResponse> => {
  const isValidAccessToken = validateAccessToken(accessToken);
  const isValidRefreshToken = await verifyRefreshToken(refreshToken);

  if (isValidAccessToken && isValidRefreshToken) {
    // Both tokens are valid, proceed with authentication
    return { isValid: true };
  } else if (isValidAccessToken) {
    // Only access token is valid, allow access
    return { isValid: true };
  } else if (isValidRefreshToken) {
    // Only refresh token is valid, prompt user to login
    return { isValid: false };
  } else {
    // Neither token is valid, prompt user to login
    return { isValid: false };
  }
};

const verifyRefreshToken = async (refreshToken: string): Promise<boolean> => {
  const secret = await TOTPSecret.findOne({ user_id: refreshTokens.id });
  if (secret && secret.secret === refreshToken) {
    // Refresh token is valid, update secret
    await TOTPSecret.update({ user_id: refreshTokens.id, secret: refreshToken }, { upsert: true });
    return true;
  } else {
    return false;
  }
};

export { generateTokenPair, validateTokens, verifyRefreshToken };