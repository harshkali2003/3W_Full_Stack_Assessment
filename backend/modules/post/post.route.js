const express = require("express")
const router = express.Router()

const Post = require("./post.controller")
const uploads = require("../../config/multer.config")
const {verifyAccessToken} = require("../../common/middlewares/jwt.middleware")

router.post("/create" , verifyAccessToken , uploads.single("filename") , Post.createPost)

router.get("/all" , Post.getAllPosts)

module.exports = router;