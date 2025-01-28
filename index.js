import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./Routes/userRouter.js";
import productRouter from "./Routes/ptoductRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
    


const app = express();

const mongoUrl = process.env.MONGO_DB_URI

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
        jwt.verify(token, process.env.SECRET , (error,
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

