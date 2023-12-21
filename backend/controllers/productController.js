import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc      get all products
 * @route     Get/api/products
 * @access    public
 */

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc      get single products
 * @route     Get/api/products/:id
 * @access    public
 */

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.err(err.message);
    res.status(400).json({ message: 'Something went wrong' });
  }
});

export { getProducts, getProductById };
