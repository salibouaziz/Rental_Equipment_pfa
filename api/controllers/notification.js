import Notification from "../models/Notification.js";

// Controller function to get notifications
export const getNotifications = async (req, res, next) => {
  try {
    // Assuming the user ID of the logged-in admin is available in req.user._id
    const adminId = req.user._id;

    // Fetch notifications for the admin user
    const notifications = await Notification.find({ user: adminId });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};
// Controller function to mark a notification as read
export const markNotificationAsRead = async (req, res, next) => {
  try {
    const notificationId = req.params.id;

    // Update the notification to mark it as read
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    next(error);
  }
};
// Controller function to get unread notifications for admin
export const getUnreadNotifications = async (req, res, next) => {
  try {
      const adminId = req.user._id;
      const unreadNotifications = await Notification.find({ user: adminId, isAdminRead: false });
      res.status(200).json(unreadNotifications);
  } catch (error) {
      next(error);
  }
};
// Controller function to delete a notification
export const deleteNotification = async (req, res, next) => {
  try {
    const notificationId = req.params.id;

    // Delete the notification
    await Notification.findByIdAndDelete(notificationId);

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    next(error);
  }
};


