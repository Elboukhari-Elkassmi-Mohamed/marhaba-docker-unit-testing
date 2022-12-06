const jwt = require("jsonwebtoken");

 const checkRoleclient = async (req,res,next)=>{
    const token = req.cookies.access_token;

    const getInfo =  jwt.verify(token, process.env.JWT_KEY)
     const userRole = getInfo.role.role

     
 
  if(userRole !== "client"){
    return res.send("Access denied")
  }
        next();
}

module.exports = checkRoleclient;