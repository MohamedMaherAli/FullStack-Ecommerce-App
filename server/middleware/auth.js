import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import 'dotenv/config';

export const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    const isCustomToken = token.length < 500;
    let decodeData;
    if (isCustomToken) {
      decodeData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodeData?.id;
      req.isAdmin = decodeData?.isAdmin;
      req.username = decodeData?.name;
    } else {
      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub;
    }
    next();
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

export const isAdmin = (req, res, next) => {
  if (req.isAdmin === true) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
