import User from "../models/user.js";
import bcrypt from "bcrypt";


// Create User Signup
export function createUser(req, res) {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
        role: "customer",  // sure role is customer
        phone: req.body.phone || "Not Given"
    };

    const user = new User(userData);

    user.save()
        .then(() => {
            res.json({
                message: "User Created Successfully"
            });
        })
        .catch(() => {
            res.json({
                message: "Failed to create user"
            });
        });
}

// Create Admin (Backend)
export function createAdmin(req, res) {
    const defaultPassword = "admin123";
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);

    const userData = {
        firstName: "Admin",
        lastName: "User",
        email: req.body.email,
        password: passwordHash,
        role: "admin",
        phone: "Not Given",
        isEmailVerified: true
    };

    const user = new User(userData);

    user.save()
        .then(() => {
            res.json({
                message: "Admin Created Successfully with default details"
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to create admin",
                error
            });
        });
}

// Get All Users
export function getUsers(req, res) {
    User.find()
        .then((user) => {
            res.json(user);
        })
        .catch(() => {
            res.json({
                message: "Failed to fetch users",
            });
        });
}

// Update User by Email
export function updateUserByEmail(req, res) {
    const email = req.params.email;
    const updateData = { ...req.body };

    if (req.body.password) {
        updateData.password = bcrypt.hashSync(req.body.password, 10);
    }

    User.findOneAndUpdate({ email: email }, updateData, { new: true })
        .then((updateduser) => {
            if (!updateduser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({
                message: "User updated successfully",
                data: updateduser
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to update User", error });
        });
} 

// Delete User by Email
export function deleteUserByEmail(req, res) {
    const email = req.params.email;

    User.findOneAndDelete({ email: email })
        .then((deleteduser) => {
            if (!deleteduser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({
                message: "User deleted successfully",
                data: deleteduser
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to delete user", error });
        });
}

// Login User (Only Customers)
export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, role: "customer" }) // role check
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "Incorrect Login"
                });
            }
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (isPasswordCorrect) {
                res.json({
                    message: "Customer Login Successful"
                });
            } else {
                res.status(403).json({
                    message: "Incorrect Password"
                });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Login Failed" });
        });
}

// Login Admin 
export function loginAdmin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, role: "admin" }) // role check
        .then((admin) => {
            if (!admin) {
                return res.status(404).json({
                    message: "Admin Not Found"
                });
            }
            const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
            if (isPasswordCorrect) {
                res.json({
                    message: "Admin Login Successful"
                });
            } else {
                res.status(403).json({
                    message: "Incorrect Password"
                });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Login Failed" });
        });
}
