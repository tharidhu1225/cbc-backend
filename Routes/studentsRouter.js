import express from "express";
import { creatuser,getuser,deleteuser } from "../controlers/studentControler.js";


const userRouter = express.Router();

userRouter.get("/",getuser)

userRouter.post("/",creatuser)

userRouter.delete("/",deleteuser)

export default studentRouter;