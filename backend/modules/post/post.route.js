const express = require("express")
const router = express.Router()

const Post = require("./post.controller")
const uploads = require("../../config/multer.config")

router.post("/create" , uploads.single("filename") , Post.createPost)

router.get("/all" , Post.getAllPosts)

module.exports = router;