const { query } = require('../libs/database');

class Song{
    static async getAll(){
        return await query("SELECT * FROM songs")
    }
}

module.exports = Song;