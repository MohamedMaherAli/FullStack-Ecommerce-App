import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import 'dotenv/config';

const auth = asyncHandler(async (req, res, next) => {
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

export default auth;
