import express from "express";
import { createOrder } from "../controlers/orderConroller.js";


const orderRouter = express.Router();

orderRouter.post("/", createOrder)

export default orderRouter;