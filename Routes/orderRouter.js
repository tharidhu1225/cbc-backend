import express from "express";
import { createOrder, getOrders, getQuote } from "../controlers/orderConroller.js";


const orderRouter = express.Router();

orderRouter.post("/", createOrder)
orderRouter.get("/", getOrders)


export default orderRouter;