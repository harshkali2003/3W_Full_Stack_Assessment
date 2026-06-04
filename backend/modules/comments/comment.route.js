const express = require("express")
const router = express.Router()

const Comment = require("./comment.controller")

router.post("/create/:id" , Comment.createComment)

router.get("/get/:id" , Comment.getCommentByPost)

module.exports = router;