import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';

//@desc Fetch all products
//@route  get/api/products
//@acess  public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json({ data: products });
});

//@desc Fetch single product
//@route  get/api/products/:id
//@acess  public
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.json({ data: product });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
