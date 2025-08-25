import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import employeeRouter from "./routers/employeeRouter.js";
import repairRouter from "./routers/repairRouter.js";
import packageRouter from "./routers/packageRouter.js";
import supplierRouter from "./routers/supplierRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config()

const app = express();

app.use(cors())

app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
           const token = value.replace("Bearer ","") 
           jwt.verify(token,process.env.JWT_SECRET,
            (err,decoded)=>{
                if(decoded == null){
                    res.status(403).json({
                        message : "Unuthorized"
                    })
                }else{
                    req.user = decoded
                    next()
                }
            }
           )
        }else{
            next()
        }
         
        
    }
)

const connectionString = process.env.MONGO_URL

mongoose.connect(connectionString)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.error("Failed to connect to the database:");
        console.error(error);
    });

app.use("/users",userRouter)
app.use("/employees",employeeRouter)
app.use("/repairs",repairRouter)
app.use("/packages",packageRouter)
app.use("/suppliers",supplierRouter)
app.use("/products",productRouter)
app.use("/orders",orderRouter)


app.listen(5000, 
   ()=>{
       console.log("server started") 
   }
) 









