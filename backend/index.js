const express = require("express")
const app = express()

const User = require("./modules/user/user.route")

app.use(express.json())

app.use("/auth" , User)

app.listen(5000 , () => {
    console.log("Server is connected")
})