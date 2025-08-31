import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";
import OTP from "../models/otp.js";
const pw="njppmjrdxsbnrvif"


dotenv.config();

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "sandarudilshan24@gmail.com",
		pass: pw,
	},
});



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

// // Get All Users
// export function getUsers(req, res) {
//     User.find()
//         .then((user) => {
//             res.json(user);
//         })
//         .catch(() => {
//             res.json({
//                 message: "Failed to fetch users",
//             });
//         });
// }

// // Update User by Email
// export function updateUserByEmail(req, res) {
//     const email = req.params.email;
//     const updateData = { ...req.body };

//     if (req.body.password) {
//         updateData.password = bcrypt.hashSync(req.body.password, 10);
//     }

//     User.findOneAndUpdate({ email: email }, updateData, { new: true })
//         .then((updateduser) => {
//             if (!updateduser) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             res.json({
//                 message: "User updated successfully",
//                 data: updateduser
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({ message: "Failed to update User", error });
//         });
// } 

// // Delete User by Email
// export function deleteUserByEmail(req, res) {
//     const email = req.params.email;

//     User.findOneAndDelete({ email: email })
//         .then((deleteduser) => {
//             if (!deleteduser) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             res.json({
//                 message: "User deleted successfully",
//                 data: deleteduser
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({ message: "Failed to delete user", error });
//         });
// }


//login Users
export function LoginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })  
        .then((user) => {            
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found"
                });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (isPasswordCorrect) {
                const token = jwt.sign({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isBlock: user.isBlock,
                    isEmailVerified: user.isEmailVerified
                }, process.env.JWT_SECRET);

                res.json({
                    token: token,
                    message: "Login Successful",
                    role : user.role,
                });
            } else {
                res.status(403).json({
                    message: "Incorrect Password"
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: "Login Failed",
                error: error.message
            });
        });
}

export function getUser(req,res){
    if(req.user == null){
         res.status(404).json({message: "User Not Found"});
    }else{
         res.json(req.user);
    }

}


export function isAdmin(req){

    if(req.user == null){
        return false;
    }
    
    if(req.user.role == "admin"){
        return true;
    }else{
        return false;
    }
}


export async function googleLogin(req, res) {
    const googleToken = req.body.token;

    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${googleToken}`
            }
        });

        const userInfo = response.data;

        let user = await User.findOne({ email: userInfo.email });

        if (user) {
            // User exists — return token
            const token = jwt.sign({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isBlock: user.isBlock,
                isEmailVerified: user.isEmailVerified,
                image: user.image
            }, process.env.JWT_SECRET);

            return res.json({
                token,
                message: "Login Successful",
                role: user.role
            });
        } else {
            // Create new user
            const newUser = new User({
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
                email: userInfo.email,
                role: "customer",
                isEmailVerified: true,
                image: userInfo.picture,
                password: "123"
            });

            const savedUser = await newUser.save();

            const token = jwt.sign({
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                role: savedUser.role,
                isBlock: savedUser.isBlock,
                isEmailVerified: savedUser.isEmailVerified,
                image: savedUser.image
            }, process.env.JWT_SECRET);

            return res.json({
                token,
                message: "User Registered & Logged in Successfully",
                role: savedUser.role
            });
        }

    } catch (error) {
        console.error("Error fetching Google user info:", error.message);
        return res.status(500).json({
            message: "Google Login Failed",
            error: error.message
        });
    }
}

export async function sendOTP(req,res){
    const email = req.body.email;
    //random number between 111111 and 999999
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    //delete all otps from the email
    try{
        await OTP.deleteMany({ email: email })
        const newOTP = new OTP({ email: email, otp: otpCode });
        await newOTP.save();

        const message = {
            from : "sandarudilshan24@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otpCode}`,
        }
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                res.status(500).json({ message: "Failed to send OTP" });
            } else {
                console.log("Email sent:", info.response);
                res.json({ message: "OTP sent successfully" });
            }
        });

    }catch{
        res.status(500).json({ message: "Failed to delete previous OTPs" });
    }
    
}



export async function resetPassword(req,res){
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const otp = req.body.otp;

    try{
        const otpRecord = await OTP.findOne({ email: email, otp: otp });
        if(!otpRecord){
            return res.status(404).json({ message: "Invalid OTP" });
        }

        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        await User.updateOne({ email: email }, { password: hashedPassword });
        await OTP.deleteMany({ email: email });

        res.json({ message: "Password reset successfully" });
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Failed to reset password" });
    }
}
