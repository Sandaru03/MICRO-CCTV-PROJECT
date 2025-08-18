import Employee from "../models/employee.js";
import bcrypt from "bcrypt";

// Create Employee (Admin Only)
export function createEmployee(req, res) {
    const defaultPassword = "employee123";
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);

    const employeeData = {
        ...req.body,
        password: passwordHash
    };

    const employee = new Employee(employeeData);

    employee.save()
        .then(() => {
            res.json({ message: "Employee Created Successfully with default password" });
        })
        .catch(() => {
            res.json({ message: "Failed to create Employee" });
        });
}

// // Employee Login
// export function loginEmployee(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;

//     Employee.findOne({ email: email })
//         .then((employee) => {
//             if (!employee) {
//                 return res.status(404).json(
//                     {
//                          message: "Employee Not Found" 
//                     });
//             }

//             const isPasswordCorrect = bcrypt.compareSync(password, employee.password);
//             if (isPasswordCorrect) {
//                 res.json(
//                     { 
//                         message: "Login Successful" 
//                     });

//             } else {
//                 res.status(403).json(
//                     {
//                          message: "Incorrect Password" 
//                     });
//             }
//         })
//         .catch(() => {
//             res.status(500).json(
//                 {
//                      message: "Login Failed" 
//                 });
//         });
// }

// Update Employee by Email (Allow password change) (only Admin)
export function updateEmployeeByEmail(req, res) {

    if(req.user == null){
        res.status(403).json({
            message : "Please Login to update a employee"
        })
        return
    }
    if(req.user.role!="Admin"){
        res.status(403).json({
            message : "Please login an Admin to update employee"
        })
        return
    }



    const email = req.params.email;
    const updateData = { ...req.body };

    if (req.body.password) {
        updateData.password = bcrypt.hashSync(req.body.password, 10);
    }

    Employee.findOneAndUpdate({ email: email }, updateData, { new: true })
        .then((updatedEmployee) => {
            if (!updatedEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            res.json({
                message: "Employee updated successfully",
                data: updatedEmployee
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to update Employee", error });
        });
}

// Delete Employee by Email (only Admin)
export function deleteEmployeeByEmail(req, res) {
    const email = req.params.email;

    Employee.findOneAndDelete({ email: email })
        .then((deletedEmployee) => {
            if (!deletedEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            res.json({
                message: "Employee deleted successfully",
                data: deletedEmployee
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to delete Employee", error });
        });
}

// Get All Employees (only Admin)
export function getEmployee(req, res) {
    Employee.find()
        .then((employees) => {
            res.json(employees);
        })
        .catch(() => {
            res.json({ message: "Failed to fetch Employee" });
        });
}
