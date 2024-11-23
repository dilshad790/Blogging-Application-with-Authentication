const {validateToken}=require("../services/authentication")

function checkForAuthentication(cookieName)
{ 
    // console.log("checkForAuthentication called");
    
    return (req,res,next)=>{
        const tokenValue=req.cookies[cookieName]
        // console.log(tokenValue);
        
        if(!tokenValue)
           return next()
        try {
            const userPayload=validateToken(tokenValue)
            // console.log("valid token",userPayload);
            
            req.user=userPayload
        } catch (error) {
            // console.error("Authentication failed",error.message)
            
        }
        next()
    }
}

module.exports=checkForAuthentication;