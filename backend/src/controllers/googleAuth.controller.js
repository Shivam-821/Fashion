import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {oauth2client} from "../utils/googleConfig.js";
import axios from "axios";
import jwt from "jsonwebtoken";

const googleLogin = async (req, res) => {
  try {
    const {code} = req.query;

    if (!code)
      return res.status(400).json({message: "Authorization code is missing"});

    const {tokens} = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    if (!tokens.access_token) {
      return res
        .status(400)
        .json({message: "No access token received from Google"});
    }

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const {email, name, picture} = userRes.data;

    let user = await User.findOne({email});
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
      });
    }

    const token = jwt.sign({_id: user._id, email}, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });

    res.status(200).json(new ApiResponse(
      200,
      {user, token},
      "Google login successfull"
    ));
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json(new ApiError(500, "Internal Server error"));
  }
};

export {googleLogin};
