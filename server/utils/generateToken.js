import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (id, isAdmin, name) => {
  return jwt.sign({ id, isAdmin, name }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });
};
