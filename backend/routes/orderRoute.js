import express from 'express';
import { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus, 
  verifyEsewaPayment,
  getOrderById 
} from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// User routes (require user authentication)
orderRouter.post('/create', userAuth, createOrder);
orderRouter.get('/user', userAuth, getUserOrders);
orderRouter.get('/:orderId', userAuth, getOrderById);

// Admin routes (require admin authentication)
orderRouter.get('/admin/list', adminAuth, getAllOrders);
orderRouter.put('/admin/:orderId', adminAuth, updateOrderStatus);

// eSewa payment verification (public endpoint)
orderRouter.post('/verify-payment', verifyEsewaPayment);

export default orderRouter;
