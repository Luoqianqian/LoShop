import express from 'express';
import { authUser, register, logout} from '../controllers/userController.js';

const router = express.Router();

router.post('/auth', authUser);
router.post('/register', register);
router.post('/logout', logout);

export default router;