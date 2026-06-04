const express = require("express")
const router = express.Router()

const Post = require("./post.controller")

router.post("/create" , Post.createPost)

router.get("/all" , Post.getAllPosts)

module.exports = router;