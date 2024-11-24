const express = require("express");
const route = express.Router();
const { jwtmiddleware, generateToken } = require("./../jwt");
require('dotenv').config()
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

//import person model
const User = require("../models/user");
//import otp model
const Otp=require("./../models/Otp");

//post method for user registration in a person collection
route.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    //check if admin already present or not
    const isAdmin = await User.findOne({ role: "admin" });
    if (data.role === "admin" && isAdmin) {
      return res.status(400).json({ error: "Please correct your Role" });
    }
    if (data.age < 18) {
      return res
        .status(400)
        .json({ error: "age should be greater or equal to 18" });
    }

    const newUser = new User(data);
    const response = await newUser.save();
    console.log("Data insert successfully");

    //create payload for generate token
    const jwtPayload = {
      id: response.id,
    };
    console.log(JSON.stringify(jwtPayload));
    //parameter pass to generate token function
    const token = generateToken(jwtPayload);
    console.log("token", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//post method for user login in a person collection
route.post("/login", async (req, res) => {
  try {
    //extrct username and password fom request body
    const { uidaiNo, password } = req.body;
    //check username in person database
    const user = await User.findOne({ uidaiNo: uidaiNo });
    if (!user) {
      return res.status(403).json({ message: "user not exist" });
    }
    if (!user || !(await user.comparePassword(password))) {
      //comparePassword is a function that match user with a password
      return res.status(401).json({ error: "Invalid Username and Password" });
    }

    //generate token
    const userPayload = {
      id: user.id,
      uidaiNo: user.uidaiNo,
    };
    //token generate
    const token = generateToken(userPayload);
    //return response
    res
      .status(200)
      .json({ message: "login successfully", response: user, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//profile route
route.get("/profile", jwtmiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userID = userData.id;
    const user = await User.findById(userID);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "user not found" });
  }
});

//api for update user password
route.put("/profile/password", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract the id from the token
    const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

    // Check if currentPassword and newPassword are present in the request body
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both Current and New Password is require" });
    }

    // Find the user by userID
    const user = await User.findById(userId);

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    //check current password and new password are diffren
    if (currentPassword === newPassword) {
      return res
        .status(401)
        .json({ error: "Current password and New Password should not same" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    console.log("password updated successfully");
    res.status(200).json({ message: "Update Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//route for send code in a email for password forgot
route.post('/profile/sendmail', async(req,res)=>{
  const {uidaiNo}=req.body;
  if(!uidaiNo){
    res.status(401).json({error:"uidaiNo is require"})
  }

  try{
    const user=await User.findOne({uidaiNo:uidaiNo});
    if(!user){
      res.status(401).json({message:"user not found"});
    }

    const otpCode=Math.floor((Math.random()*10000)+1); //generate 4 digit random otp code

    //otp push in Otp model
    const otpData=new Otp({
      uidaiNo:uidaiNo,
      code:otpCode,
      expiresIn:new Date().getTime()+300*1000,
    });
    const responseRes=await otpData.save();
    console.log("otp code generate Successfully");
    res.status(200).json({responseRes});
    const userUidaiNo=responseRes.uidaiNo;
    const finduser=await User.findOne({uidaiNo:userUidaiNo});
    mailer(finduser.email,responseRes.code);
  }catch(err){
    res.status(500).json({error:"Internal server Error"});
  }
})

//route for forgot user password
route.post('/profile/changepassword',async(req,res)=>{
  const {uidaiNo,code}=req.body;
  try{
    const data=await Otp.find({uidaiNo:uidaiNo,code:code});
    const currTime=new Date().getTime();
    const diffTime=data.expiresIn - currTime;
    if(!data){
      return res.status(401).json({error:"data is not found"})
    }
    if(diffTime<0){
      return res.status(500).json({error:"otp expire"});
    }
    const user=await User.findOne({uidaiNo:uidaiNo});
    const {newPassword}=req.body;
    user.password=newPassword;
    user.save();
    console.log("password update successfully");
    res.status(200).json({user,message:"password update successfully"})
  }catch(err){
    res.status(500).json({error:"otp expire"});
  }
})


//create nodemailer
const mailer=(email,otp)=>{
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'jeffry.glover@ethereal.email',
      pass: 'F5VYzwyWpwZTyvmy5H',
    },
  });
  var mailOption={
    from: '"Suva Sanpui" <millie.yost26@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "reset password", // Subject line
    text: otp, // plain text body
  }
  transporter.sendMail(mailOption,function(error,info){
    if(error){
      console.log(error);
    }else{
      console.log('Email send: '+info.response);
    }
  });
}

module.exports = route;
