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
        return res.render("login",{
            error:"Incorrect credentials",
            msg:{
                email,
                password
            }
        })
    }

    static getLoginForm(req,res){
        return res.render("login")
    }

    static getSignUpForm(req, res){
        return res.render('signup')
    }

    async signUp(req,res){
        const {user} = await User.getByEmail(req.body.email);
        const data = {
            name:req.body.name,
            email:req.body.email,
            password: await this.encrypt(req.body.password),
            birthday:req.body.birthday
        }
        if(!user){
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
                    error:"Verifica los datos ingresados",
                    user:{
                        name:req.body.name,
                        email:req.body.email,
                        password: req.body.password,
                        birthday:req.body.birthday
                    }
                })
            }
        } else if(user.email === data.email) {
            return res.render("signup",{
                error:"El email esta en uso: intenta con otro"
            })
        }
    }

    static logout(req,res){
        req.session.destroy()
        return res.redirect("/")
    }

    async encrypt(string){
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(string,salt)
        return password
    }
}

module.exports = AuthController