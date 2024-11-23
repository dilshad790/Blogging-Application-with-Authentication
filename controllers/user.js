const USER = require("../models/user")
const express=require("express");

// save user and hash the password

async function handleSignUp(req, res) {
const {fullName,email,password}=req.body;
if(!fullName || !email || !password)
    return res.send("somthing is missed")

  await USER.create({
    fullName:fullName,
    email:email,
    password:password
  }) 

  return res.redirect("/test");
}

async function handleSignIn(req,res)
{
const {email,password}= req.body;
// console.log(email,password);
try {
  const token=await USER.matchPassword(email,password)
  return res.cookie("token",token).redirect("/test");
  // res.render("home",{
  //   user:user
  // })
  
} catch (error) {
  return res.render("signin",{
    error:'Incorrect email or Password'
  })
}
// console.log(token);
}

module.exports={handleSignUp,handleSignIn};