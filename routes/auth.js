const express = require("express")

const AuthController = require('../controllers/auth');
const authController = new AuthController() //Instancia de una clase (Objeto)
const authPermissions = require("../middleware/authPermissions");
const { check } = require('express-validator');
const User = require('../models/User');

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

router.post("/signup", [
    check('name').notEmpty()
    .withMessage('name is required'),
    check('email').isEmail()
    .custom(async (email) => {
        const {user} = await User.getByEmail(email);
        if (user) {
            throw new Error('Email already in use')
        }
    }),
    check('password').isLength({ min: 3 })
    .withMessage('Password must be greater than 3 chars long'),
    check('birthday').notEmpty()
    .withMessage('birthday is required')
    ],(req,res)=>{
        authController.signUp(req,res)
})

router.get("/logout",AuthController.logout)
//generando la instancia de auth controller puede generar problemas 
// funciones q pasa funciones , se podria generar un problema sobre el scope
// posibles soluciones: para que la funcion no pierda relacion con su prototype original
//

/*
solucion 1
generando una funcion anonima el metodo no pierde la referencia y puede utilizar el this
router.get('/logout', ()=>{
    authController.logout(req, res);
})

solucion 2

router.get('/signUp', authController.logout.bind(AuthController));

solucion 3
router.get('/logout', (...args)=>authcontroller.logout(...args))

*/
module.exports = router