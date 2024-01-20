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
  bookedTimeSlots : {
      from : {type : String} ,
      to : {type : String}
  } ,
  totalHours : {type : Number},
  totalAmount : {type : Number},
  transactionId : {type : String},
},
{timestamps : true}
);
export default mongoose.model("Rental", UserSchema);