const UserModel = require("../models/users.model");
const otp = require("../utils/generateOtp");
const transporterr = require("../utils/mailer");


//create user and generate otpExpiry
const createUserOtp=async(req, res)=>{
    const {email, password}=req.body;

    const user=await UserModel.findOne({email:email})

    if(user){
        return res.json({message:"user already exist"})
    }
//    console.log(otp());
   
    let otpp=otp();
//   console.log(otp);
  
  


    console.log(process.env.USER_MAIL , process.env.USER_KEY);
    
  await transporterr.sendMail({
    from:process.env.USER_MAIL,
    to:email,
    subject:'Verify OTP for tam app',
    text:`Your One-Time-Password to create your is ${otpp} . Please do not share it with anyone.`
  })


    const newUser=new UserModel({
      email:email,
      pass:password,
      otp:otpp,
      otpExpiry:new Date(Date.now() + 5*10*1000)
    })

    await newUser.save();

    return res.json({
        message:'Otp sent to your mail. please verify to create account'
    })
}



//otp verify

const verifyOtp=async(req, res)=>{
    const {email, otp}=req.body;

    if(!email || !otp){
        return res.json({message:"Please fill all the details"})

}

const user=await UserModel.findOne({email:email});

if(!user){
    return res.json({message:'user with this email not found'})
}

if(user.isVerified){
    return res.json({message:'user is already verified'})
}

if(user.otp != Number(otp) || user.otpExpiry < Date.now() ){
    return res.json({message:'Invalid or expired otp'})
}

user.otp=null;
user.isVerified=true;
user.otpExpiry=null;
await user.save();

return res.json({message:'user verified successfully'})
}


module.exports={createUserOtp, verifyOtp};