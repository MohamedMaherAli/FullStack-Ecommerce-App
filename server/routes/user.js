import express from 'express';
import {
  signIn,
  signUp,
  getUserDetails,
  updateUserDetails,
  getUsers,
} from '../controllers/user.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, isAdmin, getUsers);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', auth, getUserDetails);
router.put('/profile', auth, updateUserDetails);

export default router;
