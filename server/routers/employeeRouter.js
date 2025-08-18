import express from "express";
import { createEmployee, deleteEmployeeByEmail, getEmployee, updateEmployeeByEmail} from "../controllers/employeeControllers.js";

const employeeRouter = express.Router();

employeeRouter.post("/",createEmployee)
employeeRouter.get("/",getEmployee)
employeeRouter.put("/:email",updateEmployeeByEmail)
employeeRouter.delete("/:email",deleteEmployeeByEmail)
// employeeRouter.post("/login",loginEmployee)


export default employeeRouter