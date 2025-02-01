import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){


    const newProductData = req.body

    const product = new Product(newProductData)

    product.save().then(()=>{
        res.json({
            message : "Product created"
        })
    }).catch((error)=>{
        res.status(403).json({
            message : error
        })
    })
}

export function getProducts(req,res){
  Product.find({}).then((products)=>{
    res.json(products)
  })  
}

export function deleteProduct(req,res){
   

    const productId = req.params.productId

    Product.deleteOne(
        {productId : productId}
    ).then(()=>{
        res.json({
            message : "Product deleted"
        })
    }).catch((error)=>{
        res.json({
            message : error
        })
    })
}