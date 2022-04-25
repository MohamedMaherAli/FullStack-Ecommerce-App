import Order from '../models/order.js';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

//@des Create new order
//@route POST /api/orders
//@access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const userId = req.userId;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items were found');
  } else {
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    await order.save();
    res.status(201).json(order);
  }
});

//@des get order buy id
//@route GET /api/orders/:id
//@access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(orderId) || !orderId) {
    res.status(400);
    throw new Error('Order id is not valid');
  }
  const order = await Order.findById(orderId).populate('user', 'name email');
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@des update order to paid
//@route put /api/orders/:id/pay
//@access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(orderId) || !orderId) {
    res.status(400);
    throw new Error('Order id is not valid');
  }
  const order = await Order.findById(orderId);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      emailAddress: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order is not found');
  }
});

//@desc get logged in user orders
//@route GET /orders/myorders
//@access Private
export const loggInUserOrders = asyncHandler(async (req, res) => {
  const id = req.userId;
  const user = await User.findById(id);
  if (user) {
    const userOrders = await Order.find({ user: id });
    if (userOrders) {
      res.status(200).json(userOrders);
    } else {
      res.status(404);
      throw new Error('No orders were found for this user');
    }
  } else {
    res.status(400);
    throw new Error('User is not found');
  }
});
