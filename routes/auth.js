const express = require("express")
const AuthController = require('../controllers/auth');
const {deleteCookie} = require('../helpers/handleCookie');
const router = express.Router()

router.get("/login", AuthController.getLoginForm)
router.post("/api/login", AuthController.login)
router.get("/signup", AuthController.getSignUpForm)
router.post('/api/signup', AuthController.signUp)
router.get("/api/logout",(req,res)=>{
    return deleteCookie(res)
})


module.exports = router