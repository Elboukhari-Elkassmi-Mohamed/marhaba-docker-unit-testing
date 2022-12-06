const router = require("express").Router();

const authController = require("../controllers/authController");

// api/auth/login
router.post("/login",authController.login);

// api/auth/register
router.post("/register", authController.register);

router.get("/verfiy-email/:token", authController.verfiyEmail)

// api/auth/forgetPassword
router.post("/forgetpassword", authController.forgetPassword);

// api/auth/resetpassword/:token
router.post("/resetpassword/:token", authController.resetPassword);

//api/auth/logout
router.get("/logout", authController.logout);


module.exports = router;
