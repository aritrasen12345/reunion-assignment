import express from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { errorHandler } from "../utils/errorHandler.js";

// Import controllers
import likePostController from "../controllers/like/likePostController.js";
import unLikePostController from "../controllers/like/unlikePostContainer.js";

const router = express.Router();

router.post("/like/:id", errorHandler, isAuthenticated, likePostController);

router.post("/unlike/:id", errorHandler, isAuthenticated, unLikePostController);

export default router;
