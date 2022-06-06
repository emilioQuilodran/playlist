//se pueden generar como funciones 
//const login = () => {}
//module.exports = {}
// tmb se puede generar como clase : mas facil al exportar la funcionalidad
const User = require('../models/User');
const bcrypt = require('bcrypt');
const query = require('express/lib/middleware/query');

class AuthController {
    static async login(req, res){
        const { email, password } = req.body;
        const {success, user} = await User.getOneByEmail(email);
        if(success && user){
            try {
                if(await bcrypt.compare(password, user.password)){
                    req.session.loggedIn = true;
                    req.session.email = user.email;
                    req.session.id = user.id; 
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

    static async signUp(req , res){
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: password,
            birthday: req.body.birthday
        }
        try {
            const result = await query("insert into users(??) values(?)",
            [Object.keys(data), Object.values(data)])

            req.session.user = {
                name : data.name,
                loggedIn :true,
                email : data.email,
                idUser : result.insertId
                
            }
            res.redirect("/")
        } catch (error) {
            return res.render('signup',{
                error: "verifica los datos",
                user: {
                    name:req.body.name,
                    email:req.body.email,
                    password: req.body.password,
                    birthday:req.body.birthday
                }
            })
        }
    }
}

module.exports = AuthController