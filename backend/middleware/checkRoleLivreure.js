const jwt = require("jsonwebtoken");

 const checkRoleLivreure = async (req,res,next)=>{
    const token = req.cookies.access_token;

    const getInfo =  jwt.verify(token, process.env.JWT_KEY)
     const userRole = getInfo.role.role
 
  if(userRole !== "livreure"){
    return res.send("Access denied")
  }

        next();
    
}

module.exports = checkRoleLivreure;