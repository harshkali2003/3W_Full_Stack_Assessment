const mongoose = require("mongoose")
const postData = new mongoose.Schema({
    content : {
        type : String,
        trim : true,
    },
    filename : {
        type : String,
    }
} , {timestamps : true})

module.exports = mongoose.model("Posts" , postData , "Posts")