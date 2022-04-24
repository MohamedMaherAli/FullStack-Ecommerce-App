import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import 'dotenv/config';

//@desc Auth user & Get a token
//@route  POST /api/users/signin
//@access public
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(401);
    throw new Error('User not found');
  }

  const isValidPassword = await existingUser.matchPassword(password);
  if (!isValidPassword) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const token = generateToken(existingUser._id);

  res.status(200).json({
    id: existingUser._id,
    name: existingUser.name,
    isAdmin: existingUser.isAdmin,
    email: existingUser.email,
    token,
  });
});

//@desc Auth user & Get a token
//@route  POST /api/users/signup
//@access public
export const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User already registered');
  }

  const user = new User({
    name: `${firstName} ${lastName}`,
    email,
    password,
  });
  await user.save();
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    }
  );
  res.status(201).json({
    id: user._id,
    name: user.name,
    isAdmin: user.isAdmin,
    email: user.email,
    password: user.password,
    token,
  });
});

//@desc   get user profile
//@route  GET /api/users/profile
//@access Private
export const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc   update user profile
//@route  POST /api/users/profile
//@access Private
export const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
