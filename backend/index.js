const express = require("express")
const app = express()

const User = require("./modules/user/user.route")
const Post = require("./modules/post/post.route")
const Comment = require("./modules/comments/comment.route")
const Like = require("./modules/likes/like.route")

app.use(express.json())

app.use("/auth" , User)
app.use("/post" , Post)
app.use("/comment" , Comment)
app.use("/like" , Like)

app.listen(5000 , () => {
    console.log("Server is connected")
})