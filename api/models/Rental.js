import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({

  product : {
    type : mongoose.Schema.Types.ObjectID , 
    ref:'Product'
  },
  user : {
    type : mongoose.Schema.Types.ObjectID , 
    ref:'User'
  },
  bookedTimeSlots :{
        from : {type : String , required : true},
        to : {type : String , required : true}
  }, 
  totalHours : {type : Number},
  totalAmount : {type : Number},
  returned: {
    type: Boolean,
    default: false, //false initially (not returned)
  },
},
{timestamps : true}
);
export default mongoose.model("Rental", bookingSchema);