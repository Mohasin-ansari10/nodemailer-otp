const { async } = require('jshint/src/prod-params');
const nodemailer = require('nodemailer');

const {userModel} = require('../models/user.model')



const otpSend = async(req , res , next)=>{

  const {email} = req.body
  const emailExist = await userModel.findOne({email});

  if (emailExist) {
    var otp = Math.floor(1000 + Math.random() * 9000);
console.log(otp);

userModel.updateOne({_id : emailExist._id} , {$set : {otp : otp}})


//otp send by mail
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure : false,
  auth: {
      user: '782878ashfaq@gmail.com',
      pass: 'xmCnK8rjgcJ4sWyD'
  }
});

//otp body
  const message = {
    from: 'NeoSoft@neosofttech.com',
    to: `${email}`,
    subject: '',
    text: `Hello This is your account verification otp ${otp}`
    
  };
  
  //call send mail function 
  transporter.sendMail(message,(error,info)=>{
    if(error){
      console.log("error",error)
    }else{
      console.log("info",info.response)
    }
  });

    
  } else {
    console.log("Email is not exist ");
  }


}

const verifyOtp = async (req , res)=>{

  const {email, otp} = req.body

  const kuch = userModel.find({email : email , otp : otp})
console.log(kuch);  

}

module.exports = {otpSend, verifyOtp}