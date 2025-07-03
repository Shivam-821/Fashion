import {FestiveSuggestion} from "../models/festive.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const suggestionForFestival = asyncHandler(async (req, res) => {
  try {
    const festiveData = await FestiveSuggestion.find().limit(20);
    return res
      .status(200)
      .json(
        new ApiResponse(200, festiveData, "Festive data fetched successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, `something went wrong: ${error}`));
  }
});

const specificSuggestion = asyncHandler(async (req, res) => {
  const {face_shape, body_shape, skin_tone} = req.body;

  try {
    const query = {};

    if (face_shape) query["profile.face_shape"] = face_shape;
    if (body_shape) query["profile.body_shape"] = body_shape;
    if (skin_tone) query["profile.skin_tone"] = skin_tone;

    if (Object.keys(query).length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, "Please provide at least one filter"));
    }

    const suggestions = await FestiveSuggestion.find(query);

    if (suggestions.length === 0) {
      return res.status(404).json(new ApiError(404, "No suggestions found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          suggestions,
          "Festive suggestions fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error while fetching festive suggestions:", error);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
});


const existUserSuggestion = asyncHandler(async (req, res) => {
    const user = req.user;
    try {
      const foundedUser = await User.findById(user._id);
      if(!foundedUser){
        return res.status(404).json(new ApiError(404, "User not found"));
      }
      const {face_shape, body_shape, skin_tone} = foundedUser.profile

      const query = {};

      if (face_shape) query["profile.face_shape"] = face_shape;
      if (body_shape) query["profile.body_shape"] = body_shape;
      if (skin_tone) query["profile.skin_tone"] = skin_tone;

      if (Object.keys(query).length === 0) {
        return res
          .status(400)
          .json(new ApiError(400, "Please provide at least one filter"));
      }

      const suggestions = await FestiveSuggestion.find(query);

      if (suggestions.length === 0) {
        return res.status(404).json(new ApiError(404, "No suggestions found"));
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            suggestions,
            "Festive suggestions fetched successfully"
          )
        );

    } catch (error) {
      console.error("Somehting went wrong while getting suggestion for existing user: ", error)
      return res.status(500).json(new ApiResponse(500, `Something went wrong: ${error}`))
    }
})

export {suggestionForFestival, specificSuggestion, existUserSuggestion}
