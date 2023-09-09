import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getProducts, getTopProducts, getProductById, createReviews } from '../controllers/productController.js';

const router = express.Router();

// router.route('/').;
router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, createReviews);

export default router;