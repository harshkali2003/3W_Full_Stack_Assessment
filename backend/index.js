const express = require("express")
const app = express()

const User = require("./modules/user/user.route")
const Post = require("./modules/post/post.route")

app.use(express.json())

app.use("/auth" , User)
app.use("/post" , Post)

app.listen(5000 , () => {
    console.log("Server is connected")
})