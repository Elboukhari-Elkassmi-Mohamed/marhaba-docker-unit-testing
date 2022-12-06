const router = require("express").Router();

const livreureController = require("../controllers/livreuereController");
const checkAuth = require("../middleware/checkAuth") ;
const checkRoleLivreure = require("../middleware/checkRoleLivreure");






// api/livreure/me
router.get("/me",checkAuth,checkRoleLivreure,(req,res)=>{
    res.json("Welcome livreure");
});








module.exports=router;