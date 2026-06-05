require("dotenv").config()
const jwt = require("jsonwebtoken")

const AppError = require("../../common/errors/global.error")

const generateAccessToken = (payload) => {
    return jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn : "24h"})
}

const verifyAccessToken = (req , resp , next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return next(new AppError("AuthHeader is missing" , 400))
    }

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)

        req.user = decoded;

        next()
    }catch(err){
        return next(new Error(err))
    }
}

module.exports = {generateAccessToken , verifyAccessToken}