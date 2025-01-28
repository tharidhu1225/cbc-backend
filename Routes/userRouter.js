import express from "express";
import { createUser, deleteUser, loginUser } from "../controlers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/", deleteUser);

export default userRouter;