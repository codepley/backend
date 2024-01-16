import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

cloudinary.config({ 
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
   api_key: process.env.CLOUDINARY_API_KEY, 
   api_secret: process.env.CLOUDINARY_API_SECRET 
 });

const uploadOnCloudinary = async function(localFilePath) {
   try {
      if(!localFilePath) return null;
      // upload on cloudinary
      const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
         resource_type: 'auto'
      })

      // file has been uploaded
      console.log("File uploaded successfully on cloudinary")
      return uploadResponse
   } catch (error) {
      fs.unlinkSync(localFilePath)
      return null
   }
}
          
export {uploadOnCloudinary}