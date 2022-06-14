const express = require("express")
const SongsController = require('../controllers/songs');

const router = express.Router();

router.post("/", SongsController.create)
router.get("/",SongsController.getAll)

module.exports = router;