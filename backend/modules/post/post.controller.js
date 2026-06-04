const Post = require("./post.model")

exports.createPost = async (req , resp , next) => {
    try{
        const {content} = req.body;
        const filename = req.file?.filename

        if(!content?.trim() && !filename){
            return next(new Error(""))
        }

        const post = await Post.create({
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
            return next(new Error(""))
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