import Order from "../models/order.js";
import Product from "../models/product.js";


export async function createOrder(req,res){

  try {
    const { myName,customerName, email, address, phone, orderItems, paymentMethod } = req.body;

    // Validate required fields
    if (!myName || !customerName || !email || !address || !phone || !orderItems.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new order with default values for order status and payment status
    const newOrder = new Order({
      myName,
      customerName,
      email,
      address,
      phone,
      orderItems,
      paymentMethod: paymentMethod || "Cash on Delivery", // Default payment method
      paymentStatus: "Pending", // Default payment status
      orderStatus: "Pending", // Default order status
      trackingNumber: "", // Empty tracking number initially
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
} catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to retrieve orders" });
}
  }

export async function getQuote(req,res){
    try{
        const newOrderData = req.body

        const newProductArray = []

        let total = 0;
        let labeledTotal = 0;
        console.log(req.body)
        for(let i=0; i<newOrderData.orderedItems.length;i++){

            const product = await Product.findOne({
                productId : newOrderData.orderedItems[i].productId
            })

            if(product == null){
                res.json({
                    message : "Product with id "+newOrderData.orderedItems[i].productId+" not found"
                })
                return
            }
            labeledTotal += product.price * newOrderData.orderedItems[i].qty;
            total += product.lastPrice * newOrderData.orderedItems[i].qty;
            newProductArray[i] = {
                name: product.productName,
                price : product.lastPrice,
                labeledPrice : product.price,
                quantity : newOrderData.orderedItems[i].qty,
                image : product.images[0]
            }
            
        }
        console.log(newProductArray)

        newOrderData.orderedItems = newProductArray
        newOrderData.total = total;
        res.json({
            orderedItems : newProductArray,
            total : total,
            labeledTotal : labeledTotal
        })
    }catch(error){
        console.log("Error:", error);
        res.status(500).json({
            message : error.message
        })
    }
}