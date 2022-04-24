import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' });
};
