// server/models/technician.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const technicianSchema = new Schema(
  {
    firstName:  { type: String, required: true, trim: true },
    lastName:   { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:   { type: String, required: true },     
    phone:      { type: String, default: "Not Given" }, 
    salary:     { type: String, required: true },     
    speciality: { type: String, default: "" },           
    isActive:   { type: Boolean, default: true }
  },
  { timestamps: true }                                     
);

export default model("technicians", technicianSchema);
