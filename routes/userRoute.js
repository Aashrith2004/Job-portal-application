import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUsercontroller } from "../controllers/userController.js";
const router = express.Router();

router.put("/update-user", userAuth, updateUsercontroller);
export default router;
