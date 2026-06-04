const express = require("express")
const router = express.Router()

const Like = require("./like.controller")

router.post("/like/:id" , Like.toggleLike)

module.exports = router;