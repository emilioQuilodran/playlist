//se pueden generar como funciones 
//const login = () => {}
//module.exports = {}
// tmb se puede generar como clase : mas facil al exportar la funcionalidad
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {query} = require("../libs/database")
const { validationResult } = require('express-validator');

class AuthController {
    static async login(req, res){
        const { email, password } = req.body;
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(422).render("login" , {
                msg: "las credenciales son incorrectas",
            })
        }
        const {success, user} = await User.getByEmail(email);
        if(success && user){
            try {
                if(await bcrypt.compare(password, user.password)){
                    req.session.user = {
                        loggedIn : true,
                        name : user.name,
                        email : user.email,
                        idUser : user.id,
                    }
                    return res.redirect("/")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    static getLoginForm(req,res){
        return res.render("login")
    }

    static getSignUpForm(req, res){
        return res.render('signup')
    }

    static async signUp(req,res){
        const errors = validationResult(req)
        console.log(errors);
        if(!errors.isEmpty()) {
            return res.status(422).render("signup" , {
                msg: "Verifique los datos ingresados",
            })
        }

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password,salt)
        const data = {
            name:req.body.name,
            email:req.body.email,
            password: password,
            birthday:req.body.birthday
        }
        try {
            const result = await query(
                "INSERT INTO users(??) VALUES(?)",
                [Object.keys(data),Object.values(data)]
            )

            req.session.user = {
                loggedIn : true,
                name : data.name,
                email : data.email,
                idUser : result.insertId,
            }
            return res.redirect("/")
        }catch(error){
            return res.render("signup",{
                error:"Verifica los datos",
                user:{
                    name:req.body.name,
                    email:req.body.email,
                    password: req.body.password,
                    birthday:req.body.birthday
                }
            })
        }
    }

    static logout(req,res){
        req.session.destroy()
        return res.redirect("/")
    }
}

module.exports = AuthController