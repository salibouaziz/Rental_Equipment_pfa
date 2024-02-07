import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/categories.js";
import rentalRouter from './routes/rental.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

mongoose.connection.on("disconnected", ()=>{
  console.log("mongo is disconnected!");
});
const corsOptions = {
  origin: 'http://localhost:3000', // replace with your frontend URL
  credentials: true, // allow credentials (cookies, headers)
  optionsSuccessStatus: 204, // handle preflight OPTIONS requests
};
//middleWares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);

app.use('/images', express.static('images'));


app.use("/api/rental", rentalRouter);




//middleware error handler
app.use((err,req,res,next)=>{
  console.error(err.stack);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    messsage: errorMessage,
    stack: err.stack

  });
});

connect()
  .then(() => {
    app.listen(3001, () => {

    

      console.log(`Server is running on port 3001`);

    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
  });
