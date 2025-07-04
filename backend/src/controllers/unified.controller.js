import {
  TopsSuggestion,
  DressSuggestion,
  OutfitSuggestion,
  KurtiSuggestion,
  SareeSuggestion,
  BottomsSuggestion,
  FestiveSuggestion
} from "../models/index.js";

import {User} from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";

const MODEL_MAP = {
  festive: FestiveSuggestion,
  kurti: KurtiSuggestion,
  dress: DressSuggestion,
  saree: SareeSuggestion,
  top: TopsSuggestion,
  bottom: BottomsSuggestion,
  accessory: OutfitSuggestion,
};

export const getRandomSuggestions = asyncHandler(async (req, res) => {
  const {model} = req.params;

  const SelectedModel = MODEL_MAP[model];
  if (!SelectedModel) {
    return res.status(400).json(new ApiError(400, "Invalid model"));
  }

  const randomSuggestions = await SelectedModel.find().limit(10);

  return res
    .status(200)
    .json(
      new ApiResponse(200, randomSuggestions, `Random ${model} suggestions`)
    );
});

export const getProfileSuggestions = asyncHandler(async (req, res) => {
  const {model} = req.params;
  const {face_shape, body_shape, skin_tone} = req.body;

  const SelectedModel = MODEL_MAP[model];
  if (!SelectedModel) {
    return res.status(400).json(new ApiError(400, "Model not matched"));
  }

  const query = {};
  if (face_shape) query["profile.face_shape"] = face_shape;
  if (body_shape) query["profile.body_shape"] = body_shape;
  if (skin_tone) query["profile.skin_tone"] = skin_tone;

  if (Object.keys(query).length === 0) {
    return res
      .status(400)
      .json(new ApiError(400, "Atleast one filter required"));
  }

  const suggestions = await SelectedModel.find(query);

  if (suggestions.length === 0) {
    return res.status(404).json(new ApiError(404, "No suggestions found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        suggestions,
        `Suggestions fetched for model: ${model}`
      )
    );
});

export const getExistingUserSuggestions = asyncHandler(async (req, res) => {
  const {model} = req.params;

  const SelectedModel = MODEL_MAP[model];
  if (!SelectedModel) {
    return res.status(400).json(new ApiError(400, "Invalid model"));
  }

  const user = req.user;
  const foundedUser = await User.findById(user._id);
  if (!foundedUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const {face_shape, body_shape, skin_tone} = foundedUser.profile;

  const query = {};
  if (face_shape) query["profile.face_shape"] = face_shape;
  if (body_shape) query["profile.body_shape"] = body_shape;
  if (skin_tone) query["profile.skin_tone"] = skin_tone;

  if (Object.keys(query).length === 0) {
    return res.status(400).json(new ApiError(400, "Profile is not set for user."));
  }

  const suggestions = await SelectedModel.find(query);

  if (suggestions.length === 0) {
    return res.status(404).json(new ApiError(404, "No suggestions found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        suggestions,
        `successfully fetched the suggestion for model ${model}`
      )
    );
});
