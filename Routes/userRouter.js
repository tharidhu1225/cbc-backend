import express from "express";
import { createUser, deleteUser, getUser, googleLogin, loginUser } from "../controlers/userController.js";

const userRouter = express.Router();

userRouter.get("/",getUser)
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/", deleteUser);
userRouter.post("/google", googleLogin)

export default userRouter;