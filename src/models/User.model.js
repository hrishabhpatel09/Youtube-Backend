import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    avatarImage:{
        type: String, //From cloudinary
        required:true
    },
    coverImage:{
        type:String  //From Cloudinary Url
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) next()

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    if(!password) return false
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)