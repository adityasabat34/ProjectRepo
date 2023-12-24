import { authUser, getUserProfile } from '../controllers/userController.js';
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
