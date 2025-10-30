import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide name"],
    },
    email:{
        type:String,
        required:[true, "Please provide email"],
        unique:true,
    },
    mobile:{
        type:String,
        required:[true, "Please provide mobile number"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Please provide password"],
    }
}, { timestamps : true } );

export default mongoose.model("Agent", agentSchema);