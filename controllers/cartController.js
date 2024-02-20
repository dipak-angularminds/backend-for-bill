const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const cartItems = await CartItem.find({ cart_id: cart._id }).populate('product_id');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addToCart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user_id: req.user.userId });
    if (!cart) {
      cart = new Cart({ user_id: req.user.userId });
    }

    const existingItem = await CartItem.findOne({ cart_id: cart._id, product_id: product._id });
    if (existingItem) {
      existingItem.quantity++;
      existingItem.total_price = existingItem.quantity * product.price;
      await existingItem.save();
    } else {
      const newItem = new CartItem({
        cart_id: cart._id,
        product_id: product._id,
        quantity: 1,
        total_price: product.price
      });
      await newItem.save();
    }

    // Update the total price in the cart
    cart.total_price += product.price;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// PUT /api/cart/update/:productId
const updateCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const item = cart.items.find(item => item.product.toString() === req.params.productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    if (req.body.quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
      await cart.save();
      return res.json(cart);
    }
    item.quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/remove/:productId
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/clear
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
