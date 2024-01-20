import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({

    Title : {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image : {
      type : String
    }, 
    quantity: {
      type : Number , 
      required : true
    },
    bookedTimeSlots : [
        {
            from : {type : String , required : true},
            to : {type : String , required : true}
        }
    ] , 
    rentPerHour : {
      type : Number , 
      required : true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },


}, {timestamps : true}

);

export default mongoose.model("Product", ProductSchema);