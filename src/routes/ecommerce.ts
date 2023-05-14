import express from 'express';
import { UserModel, ProductModel, CartModel } from '../models/ecommerce';

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  const user = new UserModel(req.body);
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new product
router.post('/products', async (req, res) => {
  const Entity = new ProductModel(req.body);
  try {
    const savedEntity = await Entity.save();
    res.send(savedEntity);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a user's cart
router.get('/users/:id/cart', async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartModel.findOne({ userId: id }).populate(
      'items.productId'
    );
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.send(cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a product to a user's cart
router.post('/users/:id/cart', async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;
  try {
    let cart = await CartModel.findOne({ userId: id });
    if (!cart) {
      cart = new CartModel({ userId: id });
    }
    // @ts-ignore
    const cartItem = cart.items.find((item) => item.productId.equals(productId));
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    const savedCart = await cart.save();
    res.send(savedCart);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
