import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})


export const Follower = mongoose.model('Follower',followerSchema)