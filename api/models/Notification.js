import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  rental: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rental' },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' },
  message: { type: String },
  isRead: { 
    type: Boolean, 
    default: false },
  isAdminRead: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model('Notification', NotificationSchema);
