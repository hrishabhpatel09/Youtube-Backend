import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from '../models/User.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

export const registerUser =  asyncHandler(async (req,res) =>{
    const {name, email, password, avatarImage, coverImage} = req.body;
    const existingUser = await User.findOne({email: email})
    if(existingUser){
        throw new ApiError(
            250,
            'User Already Exist'
        )
    }
    const localAvatarImage = req.file.path
    if(!localAvatarImage){
        throw new ApiError(
            301,
            'Avatar is Required'
        )
    }
    const avatarUrl = await uploadOnCloudinary(localAvatarImage);
    if(!avatarUrl){
       throw new ApiError(
        302,
        "Upload Failed On Cloudinary"
       )
    }
    const newUser = new User({
        name:name,
        email:email,
        password:password,
        avatarImage:avatarUrl,
    })
   const data = await newUser.save();
   res.json(new ApiResponse(201,data,"Registration Successful"))
})

export const loginUser = async(req,res) =>{
    const {email, password} = req.body
    if(!email || !password){
        return res.send("All fields are required")
    }
    const loggedUser = await User.findOne({email:email}).select("password")
    if(!loggedUser){
        return res.send("User Not Found!! Please Sign Up")
    }
    const isPasswordTrue = await loggedUser.isPasswordCorrect(password)
    if(isPasswordTrue){
        const token = await loggedUser.generateRefreshToken()
        res.cookie('refreshToken',token,{
            httpOnly:true,
            secure:true
        }).json(new ApiResponse(
            200,
            {
                id: loggedUser._id
            },
            "Logged in Successfully"
        ))
    }else{
        res.send("Password is Incorrect")
    }
}

export const logoutUser = async(req,res) =>{
    res.cookie("refreshToken","",{
        httpOnly:true,
        secure:true
    }).json(new ApiResponse(
        200,
        {
            message: 'LogOut SuccessFully',
        },
        'Successful Logout!'
    ))
}

export const changePassword = async(req,res) =>{
    const {email, password, newPassword} = req.body;
    if(!email || !password || !newPassword){
        return res.send("All Fields are Required");
    }
    const user = await User.findOne({email:email});
    if (!user) {
        return res.send('User Not Found');
    }
    const isPasswordTrue = await bcrypt.compare(password,user.password)
    if(isPasswordTrue){
        user.password = newPassword
        const updatedUser = await user.save()
        return res.json(new ApiResponse(200,updatedUser,'Password Changed Successfully'))
    }else{
        return res.send("Password Incorrect");
    }
}

export const getUserProfile = async(req,res) =>{
    const id = req.id;
    const profile = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from : 'posts',
                localField: '_id',
                foreignField: 'owner',
                as: 'posts'
            }
        },
        {
            $project:{
                name: 1,
                email: 1,
                avatarImage: 1,
                posts: 1
            }
        }
    ])
    if(!profile) res.json(new ApiResponse(404,{msg: 'Not Found'},"User Not Found"))
    res.json(new ApiResponse(200,profile,"Successfull"));
}