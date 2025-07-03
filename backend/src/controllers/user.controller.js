import {User} from "../models/user.model";
import {ApiError} from "../utils/ApiError";
import {ApiResponse} from "../utils/ApiResponse";
import {asyncHandler} from "../utils/asyncHandler";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    {expiresIn: process.env.TOKEN_EXPIRY}
  );
};

const registerUser = asyncHandler(async (req, res) => {
  const {fullname, email, phone, password} = req.body;
  if ([fullname, email, password].some((val) => val.trim() === "")) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  try {
    const userCreation = await User.create({
      email,
      fullname,
      phone,
      password,
    });
    if (!userCreation) {
      return res.status(500).json(new ApiError(500, "Error creating user"));
    }

    const token = await generateToken(userCreation);
    if (!token) {
      return res.status(500).json(new ApiError(500, "Error generating token"));
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "None",
    };

    return res
      .status(201)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          201,
          {userCreation, token},
          "User Created and logged in successfully"
        )
      );
  } catch (error) {
    console.log("Error registering user: ", error);
    return res.status(500).json(new ApiError(500, "Error creating user"));
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }
  const user = await User.findOne({email}).select("+password");
  if (!user) {
    return res
      .status(404)
      .json(new ApiError(404, "No user found with this email"));
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid password"));
  }  

  const token = await generateToken(user);
  if (!token) {
    return res.status(500).json(new ApiError(500, "Error generating token"));
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "None",
  };

  return res
    .status(201)
    .cookie("token", token, options)
    .json(new ApiResponse(201, {user, token}, "logged In successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user){
    return res.status(401).json(new ApiError(401, "Unauthorized!"))
  }
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))

});

const userProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }

  const foundedUser = await User.findById(user._id);
  if (!foundedUser) {
    return res
      .status(404)
      .json(new ApiError(404, "User Not Found with this id"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, foundedUser, "User fetched successfully"));
});

export {registerUser, loginUser, logoutUser, userProfile};
