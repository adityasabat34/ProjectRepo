import express from 'express';
import {
  createOrder,
  getAllOrders,
  getMyOrder,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getMyOrder);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
