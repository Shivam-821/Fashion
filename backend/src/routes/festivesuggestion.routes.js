import {
  suggestionForFestival,
  specificSuggestion,
  existUserSuggestion,
} from "../controllers/festivesuggestion.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/suggestion-festival').get(suggestionForFestival)
router.route('/get-specific-suggestion').post(specificSuggestion)
router.route('/suggestion-for-existinguser').get(verifyJWT, existUserSuggestion)


export default router