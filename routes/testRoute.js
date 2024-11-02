import express from "express";
import { testController } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/test-post", userAuth, testController);
export default router;
