const express = require("express")
const router = express.Router()

const Comment = require("./comment.controller")
const {verifyAccessToken} = require("../../common/middlewares/jwt.middleware")

router.post("/create/:id" , verifyAccessToken , Comment.createComment)

router.get("/get/:id" , Comment.getCommentByPost)

module.exports = router;