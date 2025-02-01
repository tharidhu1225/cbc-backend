import express from "express";
import { createProduct, deleteProduct, getProducts } from "../controlers/productConroller.js";

const productRouter = express.Router();

productRouter.post("/",createProduct);
productRouter.get("/",getProducts);
productRouter.delete("/:productId",deleteProduct)
export default productRouter;