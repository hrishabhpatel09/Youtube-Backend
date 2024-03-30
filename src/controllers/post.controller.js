import { Post } from "../models/Post.model.js"
import { User } from "../models/User.model.js";
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createNewPost = async(req,res) =>{
    const id = req.id
    const {caption} = req.body;
    if (!caption) {
        return res.send("Caption is Required")
    }
    const localPostPath = req.file?.path;
    if (!localPostPath) {
        return res.send('Post Content is Required')
    }
    const contentUrl = await uploadOnCloudinary(localPostPath);
    if (!contentUrl) {
        return res.send("Failed To upload on Cloudinary")
    }
    const post = new Post({
        owner: id,
        content:contentUrl,
        caption
    })
    const createdPost = await post.save()
    if (!createdPost) {
        return res.send("Failed To create Post")
    }
    res.json({
        caption:caption,
        cloudUrl: contentUrl
    })
}
export const deletePost = async(req,res) =>{
    const token = req.cookies.refreshToken
    const isValidToken = jwt.verify(token,process.env.JWT_SECRET)
    if (!isValidToken) {
        return res.send("Login to Perform This Operation")
    }
    const id = isValidToken._id;
    if(!id){
        return res.send('Invalid iD')
    }
    const {postId} = req.params;
    const post = await Post.findOneAndDelete({_id:postId , owner: id}).select('-content -owner')
    if(!post){
        return res.send("Post not Found")
    }
    return res.json({
        message: 'deleted Successfully',
        body: post
    })
   
}