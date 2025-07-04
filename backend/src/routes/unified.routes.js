import express from "express";
import {
  getProfileSuggestions,
  getExistingUserSuggestions,
  getRandomSuggestions
} from "../controllers/unified.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:model", getProfileSuggestions);
router.get("/:model/user", verifyJWT, getExistingUserSuggestions);
router.get("/:model/random", getRandomSuggestions);

export default router;
