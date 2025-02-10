import Order from "../models/order.js";
import { isCustomer } from "./userController.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {

    if (!isCustomer(req)) {
        res.json({
            message: "please login as customer to add order"
        })
    return
    }

    try {
        const lastOrder = await Order.find().sort
        ({ date: -1 }).limit(1)

        let orderId 

        if (lastOrder.length == 0) {
            orderId = "CBC001";
        } else {
           const currentOrderId = lastOrder[0].orderId
            

            const numberString = currentOrderId.replace("CBC", "")

            const number = parseInt(numberString)

            const newnumber = (number + 1).toString().padStart(4, "0");

            orderId = "CBC" + newnumber
              
        }

        const newOrderData = req.body;

        const newProductArray=[]

        for(let i=0;i<newOrderData.orderedItems.length;i++){
            const product = await product.findOne({
                productId : newOrderData.orderedItems[i].productId

            })
            if(product==null){
                res.json({
                    message: "Product with "+newOrderData.orderedItems[i].productId+ " not found"
                })
                return
            }
            newProductArray[i] = {
                productName : product.productName,
                price : product.lastPrice,
                quantity : newOrderData.orderedItems[i].qty,
                image : product.image,
                
            }
            console.log(newProductArray)

            newOrderData.orderedItems = newProductArray

        }


        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;

        const order = new Order(newOrderData)

        await order.save()
         
        res.json({
            message: "Order created"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getOrders(req,res) {
try {
    const orders = await Order.find({email : req.user.email})
    res.json(orders)
} catch (error) {
    res.status(500).json({ 
        message: error.message
     })  

}
}

export async function getQuote(req,res){
   
    try {
     
        const newOrderData = req.body;

        const newProductArray=[]

        let total = 0;
        let lebeledTotal = 0;

        for(let i=0;i<newOrderData.orderedItems.length;i++){
            const product = await product.findOne({
                productId : newOrderData.orderedItems[i].productId

            })
            if(product==null){
                res.json({
                    message: "Product with "+newOrderData.orderedItems[i].productId+ " not found"
                })
                return
            }
            lebeledTotal += product.price * newOrderData.orderedItems[i].qty;
            total += product.lastPrice * newOrderData.orderedItems[i].qty;
            
            newProductArray[i] = {
                productName : product.productName,
                price : product.lastPrice,
                lebeledPrice : product.price,
                quantity : newOrderData.orderedItems[i].qty,
                image : product.images[0],
              
            }
        }
        console.log(newProductArray)

        newOrderData.orderedItems = newProductArray;
        newOrderData.total = total;

        res.json({
            orderedItems : newProductArray,
            total : total,
            lebeledTotal : lebeledTotal,
        });

    } catch (error) {
        res.status(500).json({ 
            message: error.message,
        });
    }
}
