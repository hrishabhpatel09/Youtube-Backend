import {connectDB} from './db/index.js'
import dotenv from 'dotenv'
import { app } from './utils/app.js'
dotenv.config({
    path:'./.env'
})

connectDB()
.then(async()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is Running at port : ${process.env.PORT || 8000}`)
    })
})
.catch((err)=>{
    console.log(err)
})





