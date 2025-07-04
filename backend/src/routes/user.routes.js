import { Router } from "express";
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { loginUser, logoutUser, registerUser, userProfile, editProfile, uploadAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJWT, logoutUser)
router.route('/profile').get(verifyJWT, userProfile)
router.route('/update').patch(verifyJWT, editProfile)
router.route("/avatar").post(verifyJWT, upload.single("avatar"), uploadAvatar);

export default router