import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.js";

router.post("/signup", userController.signup);
router.post("/login", userController.login);

export default router;
