const router = require("express").Router();

const managerController = require("../controllers/managerController");
const checkAuth = require("../middleware/checkAuth") ;
const checkRoleManager = require("../middleware/checkRoleManager");





// api/manager/me
router.get("/me",checkAuth,checkRoleManager,(req,res)=>{
    res.json("Welcome client");
});



// api/auth/client
router.get("/",managerController.GetUserManger);









module.exports=router;