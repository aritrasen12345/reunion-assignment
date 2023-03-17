import express from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { errorHandler } from "../utils/errorHandler.js";

// Import controllers
import authenticateController from "../controllers/auth/authenticateController.js";
import signUpController from "../controllers/auth/SignUpController.js";

const router = express.Router();

router.post(
  "/authenticate",
  [
    body("email").normalizeEmail().isEmail().withMessage("Invalid Email"),
    body("password").isStrongPassword().withMessage("Invalid Password"),
  ],
  errorHandler,
  authenticateController
);

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Invalid name"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isStrongPassword().withMessage("Weak password"),
  ],
  errorHandler,
  signUpController
);

export default router;
