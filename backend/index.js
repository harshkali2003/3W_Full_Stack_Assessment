const express = require("express")
const cors = require("cors")
const app = express()

const User = require("./modules/user/user.route")
const Post = require("./modules/post/post.route")
const Comment = require("./modules/comments/comment.route")
const Like = require("./modules/likes/like.route")

const connectDB = require("./config/db.config")
const ErrorHandler = require("./common/middlewares/error.middleware")

connectDB()

app.use(express.json())
app.use(cors({
    origin : ["http://localhost:5173"],
    methods : ["GET" , "POST" , "PUT" , "PATCH" , "DELETE"],
    credentials : true,
    optionsSuccessStatus : 200,
}))

app.use("/auth" , User)
app.use("/post" , Post)
app.use("/comment" , Comment)
app.use("/like" , Like)

app.use(ErrorHandler)

app.listen(5000 , () => {
    console.log("Server is connected")
})