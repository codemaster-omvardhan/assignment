import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please fill the email address"],
        unique: [true, "Email address already exists"],
    },

    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
}, { 
    timestamps: true
});

export default mongoose.model("User", userSchema);