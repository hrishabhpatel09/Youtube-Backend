import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    content:{
        type: String, //From Cloudinary
        required: true
    },
    caption:{
        type:String,
        required:true
    }
},{timestamps: true})


export const Post = mongoose.model("Post", PostSchema)
