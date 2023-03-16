import express from "express";
import testServer from "../controllers/testController.js";
const router = express.Router();

// API for Testing
router.get("/", testServer);

export default router;
