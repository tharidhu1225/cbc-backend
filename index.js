import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./Routes/userRouter.js";
import productRouter from "./Routes/ptoductRouter.js";
import jwt from "jsonwebtoken";
    


const app = express();

const mongoUrl = "mongodb+srv://admin:123@cluster0.h1yaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
   
    console.log("Database connected");
})


app.use(bodyParser.json())

app.use(
    (req,res,next)=>{

      const token = req.header("Authorization")?.replace("Bearer","")

      if(token != null){
        jwt.verify(token,"cbc-secret-key-1225" , (error,
            decoded)=>{
            
                if(!error){
                req.user = decoded
            }
        })
      }

      next()

    }
)

 app.use("/api/products",productRouter)
 app.use("/api/users",userRouter)

    app.listen(
    5000,
    ()=>(
        console.log('Server is running on port 5000')
    )
)

