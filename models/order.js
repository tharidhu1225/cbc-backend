import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  myName: {type: String, required: true},
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  
  orderItems: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  

  paymentMethod: { type: String, required: true, default: "Cash on Delivery" }, // Can be "Credit Card", "PayPal", etc.
  paymentStatus: { type: String, required: true, default: "Pending" }, // "Pending", "Paid", "Failed"
  
  orderStatus: { type: String, required: true, default: "Pending" }, // "Pending", "Shipped", "Delivered"
  trackingNumber: { type: String, default: "" }, // Tracking number (optional)
  
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("orders", orderSchema);
export default Order;
