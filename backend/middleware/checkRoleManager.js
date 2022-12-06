const jwt = require("jsonwebtoken");

 const checkRoleManager = async (req,res,next)=>{
    const token = req.cookies.access_token;

    const getInfo =  jwt.verify(token, process.env.JWT_KEY)
    const userRole = getInfo.role.role
    console.log(userRole);
 
  if(userRole !== "manager"){
    return res.send("Access denied")
  }

        next();
    
}

module.exports = checkRoleManager;