const addSessionToTemplate = (req, res, next) => {
    let userInfo = req.session.user;
    if(userInfo){
        res.locals.user = userInfo
        next()
    }
}

module.exports = addSessionToTemplate;