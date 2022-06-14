const express = require("express");

// Controller
const PlaylistsController = require("../controllers/playlists")
// const authPermissions = require("../middleware/authPermissions")

const router = express.Router()

router.get("/",PlaylistsController.getMyPlaylists)
router.post("/",PlaylistsController.create)
router.post("/addSong",PlaylistsController.addSongToPlaylist)

module.exports = router