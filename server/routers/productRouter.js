import express from "express";
import { createProduct, deleteProductById, getProductById, updateProductById} from "../controllers/productControllers.js";


const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/:productId",getProductById)
productRouter.put("/:productId",updateProductById)
productRouter.delete("/:productId",deleteProductById)


export default productRouter