const { default: mongoose } = require("mongoose");
const Post = require("./post.model")

const AppError = require("../../common/errors/global.error")

exports.createPost = async (req , resp , next) => {
    try{
        const user = req.user;
        if(!user){
            return next(new AppError("login first" , 401))
        }
        const {content} = req.body;
        const filename = req.file?.filename

        if(!content?.trim() && !filename){
            return next(new AppError("content body can't be left empty" , 400))
        }

        const post = await Post.create({
            userId : user._id,
            username : user.name,
            content,
            filename,
        })

        return resp.status(201).json({
            success : true,
            message : "post created successfully",
            data : post,
        })
    } catch(err){
        return next(err)
    }
}

exports.getAllPosts = async (req , resp , next) => {
    try{
        const {page = 1 , limit = 10} = req.query;

        const pageNum = Math.max(1 , parseInt(page) || 1)
        const limitNum = Math.max(1 , parseInt(limit) || 1)
        const skip = (pageNum - 1) * limitNum;

        const posts = await Post
        .find()
        .skip(skip)
        .limit(limitNum)
        .sort({createdAt : -1})

        if(posts.length === 0){
            return next(new AppError("No Post found" , 404))
        }

        const count = await Post.countDocuments()

        return resp.status(200).json({
            success : true,
            message : "posts has been fetched",
            page : pageNum,
            count : count,
            data : posts,
        })
    } catch(err){
        return next(err)
    }
}


exports.getPostById = async (req , resp , next) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(new AppError("Invalid ID" , 400))
        }

        const post = await Post.findById(id)

        if(!post){
            return next(new AppError("No Post found" , 404))
        }

        return resp.status(200).json({
            success : true,
            message : "Post fetched successfully",
            likeCount : post.likes.length,
            data : post,
        })
    } catch(err){
        return next(err)
    }
}