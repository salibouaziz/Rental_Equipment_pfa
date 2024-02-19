import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: [String],
  },
  quantity: {
    type: Number,
    required: true,
  },
  rentPerHour: {
    type: Number,
    required: true,
  },
  rentPerDay: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['broken down', 'available', 'unavailable'],
    default: 'available',
  },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
