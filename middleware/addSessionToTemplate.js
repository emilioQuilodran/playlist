// tomar la info desde aca para guardar la info del usuario y que cada template pueda acceder
function addSessionToTemplate(config){
    return function(req,res,next){
        const user = req.session.user

        res.locals.user = user

        next()
    }
}

module.exports = addSessionToTemplate;