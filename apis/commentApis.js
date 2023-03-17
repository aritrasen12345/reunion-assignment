import express from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { errorHandler } from "../utils/errorHandler.js";

// Import controllers
import addCommentController from "../controllers/comment/addCommentController.js";

const router = express.Router();

router.post(
  "/:id",
  [
    body("comment")
      .isString()
      .isLength({ min: 4 })
      .withMessage("Invalid Comment"),
  ],
  errorHandler,
  isAuthenticated,
  addCommentController
);

export default router;
