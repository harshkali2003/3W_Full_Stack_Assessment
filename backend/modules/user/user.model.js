const mongoose = require("mongoose")
const userData = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    },
} , {timestamps : true})

module.exports = mongoose.model("Users" , userData , "Users")