import {Router} from "express";
import {googleLogin} from "../controllers/googleAuth.controller.js";

const router = Router();

router.route("/google").get(googleLogin);

export default router;
