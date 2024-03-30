import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import { upload } from '../middleware/multer.middleware.js'
import {uploadOnCloudinary} from './cloudinary.js'
import {User} from '../models/User.model.js'
import { Post } from '../models/Post.model.js'
import bodyParser from 'body-parser'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//routes import 

import userRouter from '../router/user.router.js'
import postRouter from '../router/post.router.js'
//user Routes
app.use('/users', userRouter)
app.use('/users/:name', postRouter)


export {app}