import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: 'dgfmyuduz', 
  api_key: '494179324386537', 
  api_secret:'gwxHdEDxJHax9FBrFtW7SuVoAeM'
});


console.log(process.env.CLOUDINARY_API_KEY)

export const uploadOnCloudinary = async(localPath) =>{
    try {
        if(!localPath) return null
        //upload the file
        const response = await cloudinary.uploader.upload(localPath,{
            resource_type:'auto'
        })
        //File has been Uploaded Succesfully
        fs.unlinkSync(localPath)
        return response.secure_url
    } catch (error) {
        console.log(error)
        // fs.unlinkSync(localPath) //Remove the Locally Save temp File
        return null 
    }
}