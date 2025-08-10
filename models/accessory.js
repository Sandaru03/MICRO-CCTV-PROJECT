import mongoose from "mongoose";
const accessorySchema = new mongoose.Schema({

    accessoryId : {
            type : String,
            required : true,
            unique : true
        },

    accessoryName : {
            type : String,
            required : true
        },

        price : {
            type : String,
            required : true
        },

       details : {
            type : String,
            required : true
        },
})

const Accessory = mongoose.model("accessory",accessorySchema)

export default Accessory;