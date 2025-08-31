import express from "express";
import { createAdmin, createUser, getUser,googleLogin,LoginUser, resetPassword, sendOTP } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/",createUser);
// userRouter.get("/",getUsers)
// userRouter.put("/:email",updateUserByEmail)
// userRouter.delete("/:email",deleteUserByEmail)
// userRouter.post("/login-user",loginUser)
// userRouter.post("/login-admin",loginAdmin)
userRouter.post("/create-admin",createAdmin)
userRouter.post("/login",LoginUser)
userRouter.get("/",getUser)
userRouter.post("/googlelogin",googleLogin)
userRouter.post("/send-otp",sendOTP)
userRouter.post("/reset-password",resetPassword) 

export default userRouter;