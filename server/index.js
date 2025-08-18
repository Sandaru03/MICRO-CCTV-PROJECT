import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import employeeRouter from "./routers/employeeRouter.js";
import repairRouter from "./routers/repairRouter.js";
import packageRouter from "./routers/packageRouter.js";
import supplierRouter from "./routers/supplierRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express();

app.use(cors())
app.use(bodyParser.json())

const connectionString ="mongodb+srv://dilshansandaru24:JSkg9tWOcEBK6AVK@cluster0.0ij9chu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionString)
    .then(() => {
        console.log("✅ Connected to database");
    })
    .catch((error) => {
        console.error("❌ Failed to connect to the database:");
        console.error(error);
    });

app.use("/users",userRouter)
app.use("/employees",employeeRouter)
app.use("/repairs",repairRouter)
app.use("/packages",packageRouter)
app.use("/suppliers",supplierRouter)
app.use("/products",productRouter)


app.listen(5000, 
   ()=>{
       console.log("server started") 
   }
) 









