import express from "express";
import { getLoginStatus, login, logout, register } from "../controllers/auth.js";
const router = express.Router();


router.post("/register" , register);
router.post("/login" , login);
router.get("/logout" , logout);
//get login status
router.get("/getLoginStatus",getLoginStatus);
export default router;
