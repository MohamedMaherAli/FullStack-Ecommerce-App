import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  loggInUserOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/order.js';
import { auth, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, isAdmin, getOrders);
router.post('/', auth, addOrderItems);
router.get('/myorders', auth, loggInUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/pay', auth, updateOrderToPaid);
router.put('/:id/deliver', updateOrderToDelivered);

export default router;
