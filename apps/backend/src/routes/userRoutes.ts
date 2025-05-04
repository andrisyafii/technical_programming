import { Router } from 'express';
import { fetchUserData, updateUserData } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get('/fetch-user-data/:userId', fetchUserData);
router.put('/update-user-data/:userId', updateUserData);

export default router;