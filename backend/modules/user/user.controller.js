const bcrypt = require("bcrypt")
const User = require("./user.model")

const AppError = require("../../common/errors/global.error")

exports.register = async (req , resp , next) => {
    try{
        const {name , email , password} = req.body;
        if(!name || !email || !password){
            return next(new AppError("All fields are required" , 400))
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return next(new AppError("Email is already registered" , 400))
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
        })

        return resp.status(201).json({
            success : true,
            message : "user has registered successfully",
            data : user,
        })
    } catch(err){
        return next(err)
    }
}

exports.login = async (req , resp , next) => {
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return next(new AppError("Both email and password is required" , 400))
        }

        const existingUser = await User.findOne({email})
        if(!existingUser){
            return next(new AppError("Wrong email" , 401))
        }

        const matchedPassword = await bcrypt.compare(password , existingUser.password)
        if(!matchedPassword){
            return next(new AppError("Wrong password" , 401))
        }

        return resp.status(201).json({
            success : true,
            message : "user has logged-in successfully",
        })
    } catch(err){
        return next(err)
    }
}