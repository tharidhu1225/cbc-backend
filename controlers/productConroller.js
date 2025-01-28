import Product from "../models/product.js";

export function createProduct(req,res){


    const newProductData = req.body

    const product = new Product(newProductData)

    product.save().then(()=>{
        res.json({
            message : "Product created"
        })
    }).catch((error)=>{
        res.json({
            message : error
        })
    })
}

export function getProducts(req,res){
  Product.find({}).then((products)=>{
    res.json(products)
  })  
}