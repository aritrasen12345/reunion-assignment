import express from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { errorHandler } from "../utils/errorHandler.js";

// Import controllers
import addPostController from "../controllers/post/addPostController.js";
import deletePostContainer from "../controllers/post/deletePostContainer.js";
import getPostController from "../controllers/post/getPostController.js";
import getAllPostsController from "../controllers/post/getAllPostsController.js";

const router = express.Router();

router.get("/posts/:id", errorHandler, getPostController);

router.post(
  "/posts/",
  [
    body("title").isString().isLength({ min: 2 }).withMessage("Invalid Title!"),
    body("description")
      .isString()
      .isLength({ min: 4 })
      .withMessage("Invalid Title!"),
  ],
  errorHandler,
  isAuthenticated,
  addPostController
);

router.delete("/posts/:id", errorHandler, isAuthenticated, deletePostContainer);

router.get("/all_posts", errorHandler, isAuthenticated, getAllPostsController);

export default router;
