import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  bookedTimeSlots: {
    from: { type: String, required: true },
    to: { type: String, required: true }
  },
  totalHours: { type: Number },
  totalAmount: { type: Number },
  returned: {
    type: Boolean,
    default: false
  },
  rented: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  transactionId: { type: String } 
}, { timestamps: true }
);
export default mongoose.model("Rental", bookingSchema);