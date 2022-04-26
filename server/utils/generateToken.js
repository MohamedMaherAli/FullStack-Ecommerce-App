import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '2d' });
};
