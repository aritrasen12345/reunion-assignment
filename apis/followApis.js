import express from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { errorHandler } from "../utils/errorHandler.js";

// Import controllers
import followUserController from "../controllers/follow/followUserController.js";
import unFollowUserController from "../controllers/follow/unFollowUserController.js";

const router = express.Router();

router.post("/follow/:id", errorHandler, isAuthenticated, followUserController);

router.post(
  "/unfollow/:id",
  errorHandler,
  isAuthenticated,
  unFollowUserController
);

export default router;
