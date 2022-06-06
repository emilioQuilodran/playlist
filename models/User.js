const {query} = require('../libs/database');
class User {
    static async getOneByEmail(email){
        try {
            const user = await query(`select * from users WHERE email=?`, [email])
            return {
                success: true,
                user: user[0]
            }
        } catch (error) {
            return {
                success: false,
                msg: "ocurrio un error"
            }
        }
    }
}

module.exports = User;