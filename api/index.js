import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/categories.js";
import rentalRouter from './routes/rental.js';
import returnRoutes from './routes/return.js';
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const connect = async () =>{
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb!")
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", ()=>{
  console.log("mongo is disconnected!");
});

//middleWares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/rental", rentalRouter);
app.use('/api/returns', returnRoutes);
//middleware error handler
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    messsage: errorMessage,
    stack: err.stack
  });
});
app.listen(3001, () =>{
  connect();
  console.log("connected to backend!");
});