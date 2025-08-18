// Updated supplierControllers.js File

import Supplier from "../models/supplier.js";
import bcrypt from "bcrypt";

// Create Supplier (Admin Only)
export function createSupplier(req, res) {
    const defaultPassword = "supplier123";
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);

    const supplierData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
        phone: req.body.phone || "Not Given",
        item: req.body.item || ""
    };

    const supplier = new Supplier(supplierData);

    supplier.save()
        .then(() => {
            res.json({
                message: "Supplier Created Successfully with default password"
            });
        })
        .catch(() => {
            res.json({
                message: "Failed to create Supplier"
            });
        });
}

// Get All Suppliers
export function getSupplier(req, res) {
    Supplier.find()
        .then((suppliers) => {
            res.json(suppliers);
        })
        .catch(() => {
            res.json({
                message: "Failed to fetch Supplier",
            });
        });
}

// Update Supplier by Email
export function updateSupplierByEmail(req, res) {
    const email = req.params.email;
    const updateData = { ...req.body };

    if (req.body.password) {
        updateData.password = bcrypt.hashSync(req.body.password, 10);
    }

    Supplier.findOneAndUpdate({ email: email }, updateData, { new: true })
        .then((updatedSupplier) => {
            if (!updatedSupplier) {
                return res.status(404).json({ message: "Supplier not found" });
            }
            res.json({
                message: "Supplier updated successfully",
                data: updatedSupplier
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to update Supplier", error });
        });
}

// Delete Supplier by Email
export function deleteSupplierByEmail(req, res) {
    const email = req.params.email;

    Supplier.findOneAndDelete({ email: email })
        .then((deletedSupplier) => {
            if (!deletedSupplier) {
                return res.status(404).json({ message: "Supplier not found" });
            }
            res.json({
                message: "Supplier deleted successfully",
                data: deletedSupplier
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to delete Supplier", error });
        });
}

// Supplier Login
export function loginSupplier(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    Supplier.findOne({ email: email })
        .then((supplier) => {
            if (!supplier) {
                return res.status(404).json({ message: "Supplier not found" });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, supplier.password);
            if (isPasswordCorrect) {
                res.json({ message: "Login successful" });
            } else {
                res.status(403).json({ message: "Incorrect password" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Login error", error });
        });
}
