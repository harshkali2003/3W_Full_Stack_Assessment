const multer = require("multer")
const fs = require("fs")

const filePath = "../uploads"

if(!fs.existsSync(filePath)){
    fs.mkdirSync(filePath , {recursive : true})
}

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , filePath)
    },
    filename : (req , file , cb) => {
        cb(null , file.originalname + Date.now())
    },
})

const uploads = multer({storage : storage , limits : {
    fileSize : 5 * 1024 * 1024,
    files : 2,
}})

module.exports = uploads;