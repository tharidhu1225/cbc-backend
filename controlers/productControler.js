import Product from "../models/product.js";

export async function getProduct(req,res){
    

  try{    
  const productList = await Product.find()
 
  res.json({
    list : productList
  })
  }catch(e){
    res.json({
        message : "Error"
    })
  }

}

export function createProduct(req,res){

    console.log(req.user)
    
    if(req.user == null){
        res.json({
            message : "You are not logged in"
        })
        return
    }

     if(req.user.type != "admin"){
        res.json({
            message : "you are not an Admin"
        })
        return
     }

    const product = new Product(req.body)

    product.save().then(()=>{
        res.json({
          message : "Product created"  
        })
    }).catch(()=>{
        res.json({
            message : "Product not created"
        })
    })
}

export function deleteProduct(req,res){
   
    Product.deleteOne({name : req.params.name}).then(
        ()=>{
            res.json(
                {
                    message : "Product delected successfully"
                }
            )
        }
    ).catch(()=>{
        res.json({
            message : "Product not delected"
        })
    })
}


export function getProductByName(req,res){

    const name = req.params.name;

    Product.find({name : name}).then(
        (productList)=>{

          if(productList.lenght = 0){
            res.json({
                message : "Product not fount"
            })
          }else{
            res.json({
                list : productList
            })
          }

        }
    ).catch(
        ()=>{
            res.json({
                message : "Product not found"
            })
        }
    )
}
