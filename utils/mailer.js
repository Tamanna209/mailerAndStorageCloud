const nodemailer=require("nodemailer");


const transporterr=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER_MAIL,
        pass:process.env.USER_KEY
    }
})

module.exports=transporterr;
