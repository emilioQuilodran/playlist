const { query } = require("../libs/database");

class Playlist{
    static async getMyPlaylists(idUser){
        try {
            const result = await query("SELECT * FROM playlists WHERE owner=?",[idUser])
            return {
                success:true,
                result  
            }
        } catch ({message}) {
            return {
                success:false,
                message
            }
        }
    }
    static async create(data){
        try {
            if(data.name){
                const result = await query("INSERT INTO playlists(??) VALUES(?)",[Object.keys(data),Object.values(data)])
                return {
                    success:true,
                    result
                }
            } else {
                return {
                    success:false,
                    message: "debes ingresar un titulo"
                }
            }
            
        } catch ({message}) {
            return {
                success:false,
                message
            }
        }
    }
    static async addSong(idPlaylist, idSong){
        return await query("INSERT INTO playlists_songs(id_playlist,id_song) VALUES(?,?)",[idPlaylist,idSong])
    }
    static async removeSong(idPlaylist,idSong){
        return await query("DELETE FROM playlists_songs WHERE id_playlist = ? AND id_song = ?",[idPlaylist,idSong])
    }
}

module.exports = Playlist