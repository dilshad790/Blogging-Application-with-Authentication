const express=require("express");
const router=express.Router();
const {handleSignUp, handleSignIn}=require("../controllers/user")
const rateLimit = require("express-rate-limit");
const path = require("path");
router.post("/signup",handleSignUp);
// router.post("/signin",handleSignIn);



const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs

    // handler:(req,res,next)=>{
    //     console.log("Rate Limit exceeded");
    //     // const filePath=path.join("rateLimit.html")
    //     res.status(429).sendFile(routes,"rateLimit.html")
    // }
    message: "Too many login attempts, please try again later.",

});

router.post("/signin", loginLimiter, handleSignIn);

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
})

module.exports=router;