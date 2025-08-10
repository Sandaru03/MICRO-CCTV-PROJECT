import express from "express";
import { createReapair, getRepair } from "../controllers/repairControllers.js";

const repairRouter = express.Router();

repairRouter.post("/",createReapair)
repairRouter.get("/",getRepair)

export default repairRouter