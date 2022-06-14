const express = require("express")
const session = require("express-session");
const path = require('path');
const { port, sessionSecret } = require("./config")
const addSessionToTemplate = require('./middleware/addSessionToTemplate');

// Routes
const auth = require("./routes/auth")
const playlists = require('./routes/playlists');
const songs = require("./routes/songs")

const app = express()

app.use(express.static(path.join(__dirname, "static")))
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}))
app.use(addSessionToTemplate())

// Configurando template engine
app.set("view engine","pug")
app.set("views","views")

app.use("/auth",auth)
app.use("/playlists", playlists);
app.use("/songs",songs)

app.get("/",function(req,res){
    return res.render("home")
})

app.get('/api/health', function(req, res){
    return res.json({msg:"Server running"})
})

app.listen(port,function(){
    console.log("Listening on: http://localhost:"+port)
})