const express=require("express");
const { createUserOtp, verifyOtp } = require("../controllers/user.controler");
const userRouter=express.Router();

userRouter.post('/user', createUserOtp);
userRouter.post('/opt', verifyOtp);

module.exports=userRouter;