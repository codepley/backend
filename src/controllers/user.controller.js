import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
   // get user details from frontend
   // do validation of data
   // check if user already exists in db
   // check for images - avatar and cover image
   // upload image to cloudinary
   // create user object
   // remove password and refresh token field from response
   // check for user creation
   // return res

   const { fullName, email, username, password } = req.body
   console.log("email", email)

   if([fullName, email, username, password].some((field) => field?.trim()==="")){
      throw new ApiError(400, "All field are required")
   }

   const existedUser = User.findOne({
      $or: [{username}, {email}]
   })

   if(existedUser){
      throw new ApiError(409, "User Already Exists")
   }

   const avatarLoacalPath = req.files?.avatar[0]?.path;
   const coverImgLoacalPath = req.files?.coverImage[0]?.path;

   if(!avatarLoacalPath){
      throw new ApiError(409, "Avatar image is required")
   }

   const avatar = await uploadOnCloudinary(avatarLoacalPath)
   const coverImage = await uploadOnCloudinary(coverImgLoacalPath)

   if(!avatar) {
      throw new ApiError(409, "Avatar image is required")
   }

   const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select("-password -refreshToken")

   if(!createdUser) {
      throw new ApiError(500, "User not created")
   }

   return res.status(201).json(
      new ApiResponse(200, createdUser, "User created successfully")
   )

})

export {registerUser}