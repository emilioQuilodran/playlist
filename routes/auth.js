const express = require("express")

const AuthController = require('../controllers/auth');
const authPermissions = require("../middleware/authPermissions");
const { check } = require('express-validator');

const router = express.Router()

router.use(authPermissions({
    authRequired: false,
    exclude:["/logout"]
}));

router.get("/login",AuthController.getLoginForm)

router.post("/login", [
        check('email').isEmail()
        .withMessage('Must be a valid email'),
        check('password').isLength({ min: 3 })
        .withMessage('Must be at least 8 chars long')
    ],
    AuthController.login)

router.get("/signup",AuthController.getSignUpForm)

router.post("/signup",
    check('name').exists(),
    check('email').isEmail(),
    check('password').exists(),
    check('birthday').exists(),
    AuthController.signUp)

router.get("/logout",AuthController.logout)


module.exports = router