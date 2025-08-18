import express from "express";
import { createAdmin, createUser, deleteUserByEmail, getUsers,LoginUser,updateUserByEmail } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/",createUser);
userRouter.get("/",getUsers)
userRouter.put("/:email",updateUserByEmail)
userRouter.delete("/:email",deleteUserByEmail)
// userRouter.post("/login-user",loginUser)
// userRouter.post("/login-admin",loginAdmin)
userRouter.post("/create-admin",createAdmin)
userRouter.post("/login",LoginUser)

export default userRouter;