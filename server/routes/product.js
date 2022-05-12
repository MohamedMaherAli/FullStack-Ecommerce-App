import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getCategoryProducts,
} from '../controllers/product.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/new', auth, isAdmin, createProduct);
router.get('/category/:category', getCategoryProducts);
router.get('/:id', getProductById);
router.delete('/:id', auth, isAdmin, deleteProductById);
router.put('/:id', auth, isAdmin, updateProduct);
router.post('/:id/reviews', auth, createProductReview);

export default router;
