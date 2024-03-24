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
  quantityTotal: {
    type: Number,
    required: true,
  },
  quantityDisponible: {
    type: Number,
  },
  quantityPanne: {
    type: Number,
    default: 0
  },
  currentQuantity: {
    type: Number,
    default: 0
  },
  rentPerHour: {
    type: Number,
    required: true,
  },
  rentPerDay: {
    type: Number,
    required: true,
  },
  rentalCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
