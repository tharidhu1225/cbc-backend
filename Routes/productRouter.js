import express from "express";
import { createProduct, getProducts } from "../controlers/productConroller.js";

const productRouter = express.Router();

productRouter.post("/",createProduct);
productRouter.get("/",getProducts);

export default productRouter;