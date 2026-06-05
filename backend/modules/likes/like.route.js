const express = require("express")
const router = express.Router()

const Like = require("./like.controller")
const {verifyAccessToken} = require("../../common/middlewares/jwt.middleware")

router.post("/like/:id" , verifyAccessToken , Like.toggleLike)

module.exports = router;