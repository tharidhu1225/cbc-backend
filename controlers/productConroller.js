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
    }).catch(()=>{
        res.json({
            message : "Product not deleted"
        })
    })
}

export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Please login as adminstrator to update products"
        })
        return
    }

    const productId = req.params.productId
    const newProductData = req.body

    Product.updateOne(
        {productId : productId},
        newProductData
    ).then(()=>{
        res.json({
            message: "Product updated"
        })
    }).catch((error)=>{
        res.status(403).json({
            message: error
        })
    })
}