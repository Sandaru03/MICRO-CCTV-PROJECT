import express from "express";
import { createAccessory, deleteAccessoryById, getAccessory, updateAccessoryById } from "../controllers/accessoryControllers.js";

const accessoryRouter = express.Router();


accessoryRouter.post("/",createAccessory)
accessoryRouter.get("/",getAccessory)
accessoryRouter.put("/:accessoryId",updateAccessoryById)
accessoryRouter.delete("/:accessoryId",deleteAccessoryById)

export default accessoryRouter  