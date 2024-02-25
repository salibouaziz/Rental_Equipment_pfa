import express from 'express';
import { protect ,verifyAdmin} from '../utils/verifyToken.js';
import { deleteNotification, getNotifications, getUnreadNotifications, markNotificationAsRead } from '../controllers/notification.js';

const router = express.Router();

router.get('/', protect, verifyAdmin,getNotifications);
router.patch('/:id', protect, verifyAdmin,markNotificationAsRead);
// Route to get unread notifications for admin
router.get('/unread', protect, verifyAdmin, getUnreadNotifications);
// Route to delete a notification
router.delete('/:id', protect, verifyAdmin, deleteNotification);
export default router;
