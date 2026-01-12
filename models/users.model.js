const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);


const UserModel=mongoose.model("Users", UserSchema);
module.exports=UserModel;