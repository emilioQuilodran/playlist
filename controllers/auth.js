//se pueden generar como funciones 
//const login = () => {}
//module.exports = {}
// tmb se puede generar como clase : mas facil al exportar la funcionalidad
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {query} = require("../libs/database")

class AuthController {
    static async login(req, res){
        const { email, password } = req.body;
        const {success, user} = await User.getByEmail(email);
        console.log("user", user);

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
        return res.render("login" , {
            msg: "las credenciales son incorrectas",
            user
        })
    }

    static getLoginForm(req,res){
        return res.render("login")
    }

    static getSignUpForm(req, res){
        return res.render('signup')
    }

    static async signUp(req,res){
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
            console.log(result)
            // validar resultado de la llamadada, 
            // esta fallando porq esta mal mandado el formato 
            // pero aun así crea la sesion
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