import express from 'express';
import {
  signIn,
  signUp,
  getUserDetails,
  updateUserDetails,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', auth, getUserDetails);
router.put('/profile', auth, updateUserDetails);

export default router;
