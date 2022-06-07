const { production } = require("../config")

function deleteCookie(res){
    /*return res.cookie("token","",{
        expires:new Date(),
        httpOnly:true,
        sameSite:"none",
        secure:production
    }).json({
        success:true,
        message:"Successfully logged out "
    })*/

    res.cookie("token","",{
        expires:new Date(),
        httpOnly:true,
        sameSite:"none",
        secure:production
    })
    return res.redirect("/login");

}

module.exports = {deleteCookie}