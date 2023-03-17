import express from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuth.js";
import { errorHandler } from "../utils/errorHandler.js";

// Import controllers
import getUserController from "../controllers/user/getUserController.js";

const router = express.Router();

router.get("/", errorHandler, isAuthenticated, getUserController);

export default router;
