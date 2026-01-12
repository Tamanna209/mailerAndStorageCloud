const otp=()=>{
    return Math.floor(100000 + Math.random() * 900000); // 6 digit
}

module.exports=otp;