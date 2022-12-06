const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
 const checkAuth = async (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(400).send("You Need To Login")
    }

    const getInfo = jwt.verify(token, process.env.JWT_KEY);
    const checkId = await User.findOne({ _id : getInfo.id });

    
      if(!checkId){
       return res.status(403).json("This user dose Not Exist");
      }

       next();
    

     
}

module.exports = checkAuth;