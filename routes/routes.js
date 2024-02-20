const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productController');
const authControllers = require('../controllers/authController');
const cartControllers = require('../controllers/cartController');
const orderControllers = require('../controllers/orderController');
const profileControllers = require('../controllers/profileController');
const auth = require('../middlewares/auth');
// User Authentication
router.post('/auth/register', authControllers.registerUser);
router.post('/auth/login', authControllers.loginUser);
router.get('/auth/logout', authControllers.logoutUser);
router.get('/auth/user', authControllers.getUserProfile);



router.use(auth);
// Product Management
router.get('/products', productControllers.getProducts);
router.get('/products/:id', productControllers.getProductById);
router.post('/products', productControllers.addProduct);
router.put('/products/:id', productControllers.updateProduct);
router.delete('/products/:id', productControllers.deleteProduct);

// Cart Management
router.get('/cart', cartControllers.getCart);
router.post('/cart/add/:productId', cartControllers.addToCart);
router.put('/cart/update/:productId', cartControllers.updateCartItem);
router.delete('/cart/remove/:productId', cartControllers.removeFromCart);
router.delete('/cart/clear', cartControllers.clearCart);

// Order Management
router.get('/orders', orderControllers.getOrders);
router.get('/orders/:orderId', orderControllers.getOrderById);
router.post('/orders', orderControllers.placeOrder);
router.put('/orders/:orderId', orderControllers.updateOrderStatus);

// Profile Management
router.get('/profile', profileControllers.getUserProfile);
router.put('/profile/update', profileControllers.updateUserProfile);

module.exports = router;
