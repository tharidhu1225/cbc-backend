import express from "express";
import { createUser, deleteUser, googleLogin, loginUser } from "../controlers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/", deleteUser);
userRouter.post("/google", googleLogin)

export default userRouter;