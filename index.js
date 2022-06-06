const express = require("express")
// PORT
const { port, sessionSecret } = require("./config")
const addSessionToTemplate = require('./middleware/addSessionToTemplate');

// Routes
const auth = require("./routes/auth")
const path = require('path');
const session = require("express-session");

const app = express()

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}))
app.use(addSessionToTemplate)

app.use(express.static(path.join(__dirname, "static")))
app.use(express.urlencoded({
    extended:true
}))
// Configurando template engine
app.set("view engine","pug")
app.set("views","views")

app.use(auth)

app.get("/",function(req,res){
    
    return res.render("home")
})

app.listen(port,function(){
    console.log("Listening on: http://localhost:"+port)
})