import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "unique username required"],
        
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "unique email required"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
})

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;