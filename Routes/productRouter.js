import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controlers/productConroller.js";

const productRouter = express.Router();

productRouter.post("/",createProduct);
productRouter.get("/",getProducts);
productRouter.get("/:productId",getProductById)
productRouter.delete("/:productId",deleteProduct);
productRouter.put("/:productId",updateProduct);

export default productRouter;