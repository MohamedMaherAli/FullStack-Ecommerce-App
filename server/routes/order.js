import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  loggInUserOrders,
} from '../controllers/order.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', auth, addOrderItems);
router.get('/myorders', auth, loggInUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/pay', auth, updateOrderToPaid);

export default router;
