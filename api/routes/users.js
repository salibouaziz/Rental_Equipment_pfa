import express from "express";
import { deleteUser,getUser, getUsers, updatePhoto, updateUser, countUsers } from "../controllers/user.js";
import { protect, verifyAdmin,verifyUserAdmin } from "../utils/verifyToken.js";
const router = express.Router();


//update
router.patch("/updateUser",protect,updateUser);
//update photo
router.patch("/updatePhoto",protect,updatePhoto);

//delete
router.delete("/deleteUser/:userid",protect,verifyUserAdmin,deleteUser);
router.get('/count', countUsers); 
//get
router.get("/getUser/:userid",protect, getUser);
//get all
router.get("/",protect,verifyAdmin,getUsers);



export default router;
