import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    type: String, 
  },


  

  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  
});

export default mongoose.model("Category", categorySchema);
