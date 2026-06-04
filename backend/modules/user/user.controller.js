const bcrypt = require("bcrypt")
const User = require("./user.model")

exports.register = async (req , resp , next) => {
    try{
        const {name , email , password} = req.body;
        if(!name || !email || !password){
            return next(new Error(""))
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return next(new Error(""))
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
            return next(new Error(""))
        }

        const existingUser = await User.findOne({email})
        if(!existingUser){
            return next(new Error(""))
        }

        const matchedPassword = await bcrypt.compare(password , existingUser.password)
        if(!matchedPassword){
            return next(new Error(""))
        }

        return resp.status(201).json({
            success : true,
            message : "user has logged-in successfully",
        })
    } catch(err){
        return next(err)
    }
}