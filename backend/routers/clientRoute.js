const router = require("express").Router();

const clientController = require("../controllers/clientController");
const checkAuth = require("../middleware/checkAuth") ;
const checkRoleClient = require("../middleware/checkRoleClient");





router.get("/me",checkAuth,checkRoleClient,clientController.getUserClient)

// api/client/me
// router.get("/me",checkAuth,checkRoleClient,(req,res)=>{
//     res.json("Welcome client");
// });

module.exports = router








module.exports=router;