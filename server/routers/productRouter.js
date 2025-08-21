import express from "express";
import { createProduct, deleteProduct, getProductInfo, getProducts, updateProduct} from "../controllers/productControllers.js";


const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.get("/:productId",getProductInfo)
productRouter.put("/:productId",updateProduct)
productRouter.delete("/:productId",deleteProduct)


export default productRouter