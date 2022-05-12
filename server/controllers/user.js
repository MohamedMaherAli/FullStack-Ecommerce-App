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

  const token = generateToken(
    existingUser._id,
    existingUser.isAdmin,
    existingUser.name
  );

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
  const token = generateToken(user._id, user.isAdmin, user.name);
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

//@desc   get all users
//@route  GET /api/users
//@access Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

//@desc   delete user by id
//@route  delete /api/users/:id
//@access Private/Admin
export const deleteUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    await user.remove();
    res.status(200).json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc   get user details
//@route  GET /api/users/:id
//@access Private/Admin
export const getUserByIdAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
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

//@desc   update user details
//@route  PUT /api/users/:id
//@access Private/Admin
export const updateUserDetailsAdmin = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
