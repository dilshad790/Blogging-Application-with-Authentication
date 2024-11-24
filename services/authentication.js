const JWT=require("jsonwebtoken");
const secretKey="$uperman123"
function createTokenForUser(user)
{
    const payload={
        fullName:user.fullName,
        _id:user._id,
        email:user.email,
        userProfileUrl:user.userProfileUrl,
        role:user.role
    }
    const token=JWT.sign(payload,secretKey);
    return token;
}

function validateToken(token)
{
    try {
        const payload=JWT.verify(token,secretKey);
    return payload;
    } catch (error) {
        if(error.name==="JsonWebTokenError")
            console.log("Invalid Token",error.message)
        
    }
    throw error;
    
}

module.exports={createTokenForUser,validateToken}