import express from 'express';
import { addOrderItem, getOrderDetails, updataOrderToPaid, createPaypalOrder, capturePaypalPayment} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createOrder', protect, addOrderItem);
router.get('/:id/details', protect, getOrderDetails);
router.put('/:id/pay', protect, updataOrderToPaid);
router.post('/:id/createPaypalOrder', protect, createPaypalOrder);
router.post('/:id/capture', protect, capturePaypalPayment);

export default router;