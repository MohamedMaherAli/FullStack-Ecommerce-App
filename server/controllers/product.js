import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';
import { cloudinary } from '../utils/coludinaryConfig.js';

//@desc Fetch all products
//@route  get/api/products
//@acess  public
export const getProducts = asyncHandler(async (req, res) => {
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  const products = await Product.find({ ...searchKeyword });
  res.json({ data: products });
});

//@desc Fetch products by category
//@route  get/api/products
//@acess  public
export const getCategoryProducts = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const pageSize = 4;
  const page = Number(req.query.page) || 1;
  if (category === 'all') {
    const accessoriesProducts = await Product.find({
      mainCategory: 'accessories',
    }).limit(pageSize);
    const groceriesProducts = await Product.find({
      mainCategory: 'groceries',
    }).limit(pageSize);
    const clothingProducts = await Product.find({
      mainCategory: 'clothing',
    }).limit(pageSize);

    const products = [
      ...accessoriesProducts,
      ...groceriesProducts,
      ...clothingProducts,
    ];

    res.status(200).json({ products });
  } else {
    console.log(page);
    const count = await Product.countDocuments({ mainCategory: category });
    const products = await Product.find({ mainCategory: category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  }
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

//@desc  Delete single product
//@route  delete/api/products/:id
//@acess  PRIVATE/ADMIN
export const deleteProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    await cloudinary.uploader.destroy(product.imagePublicId);
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product Removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc   Create  product
//@route  post /api/products/create
//@acess  PRIVATE/ADMIN
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    brand,
    description,
    mainCategory,
    category,
    countInStock,
    image,
    onSale,
  } = req.body;
  if (
    !name ||
    !price ||
    !brand ||
    !description ||
    !mainCategory ||
    !category ||
    !countInStock ||
    !image
  ) {
    throw new Error('Missing one or more product field');
  }

  //upload image to cloudinary
  const uploadedImageResponse = await cloudinary.uploader.upload(image);
  if (!uploadedImageResponse) {
    throw new Error('Couldnt upload image to the hosing service');
  }
  const product = new Product({
    user: req.userId,
    name,
    price,
    brand,
    description,
    mainCategory,
    onSale,
    category,
    countInStock,
    image: uploadedImageResponse.url,
    imagePublicId: uploadedImageResponse.public_id,
  });
  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201).json({ message: 'Product created successfully' });
  } else {
    throw new Error('Something went wrong!');
  }
});

//@desc   update  product
//@route  put /api/products/:id
//@acess  PRIVATE/ADMIN
export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  } else {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.brand = req.body.brand || product.brand;
    product.mainCategory = req.body.mainCategory || product.mainCategory;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.description = req.body.description || product.description;
    product.onSale = req.body.onSale;
    if (req.body.image) {
      await cloudinary.uploader.destroy(product.imagePublicId);
      const uploadedImageResponse = await cloudinary.uploader.upload(
        req.body.image
      );
      product.image = uploadedImageResponse.url;
      product.imagePublicId = uploadedImageResponse.public_id;
    }
    await product.save();
    res.status(201).json({ message: 'product updated!' });
  }
});

//@desc   create new  review
//@route  post /api/products/:id/reviews
//@acess  PRIVATE

export const createProductReview = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const userSubmittedReview = product.reviews.findIndex(
      (review) => review.user.toString() === userId.toString()
    );
    if (userSubmittedReview !== -1) {
      res.status(400);
      throw new Error('Product already reviewed');
    } else {
      const review = {
        name: req.username,
        rating: Number(rating),
        comment,
        user: req.userId,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      const totalRating = product.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      product.rating = Number(totalRating / product.numReviews);

      await product.save();
      res.status(201).send({ message: 'Review added' });
    }
  } else {
    throw new Error('Product not found');
  }
});
