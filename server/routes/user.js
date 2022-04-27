import express from 'express';
import {
  signIn,
  signUp,
  getUserDetails,
  updateUserDetails,
  getUsers,
  deleteUserById,
  getUserByIdAdmin,
  updateUserDetailsAdmin,
} from '../controllers/user.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, isAdmin, getUsers);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', auth, getUserDetails);
router.put('/profile', auth, updateUserDetails);
router.delete('/:id', auth, isAdmin, deleteUserById);
router.get('/:id', auth, isAdmin, getUserByIdAdmin);
router.put('/:id', auth, isAdmin, updateUserDetailsAdmin);

export default router;
