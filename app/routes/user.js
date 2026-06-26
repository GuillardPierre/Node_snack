import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.js";
import validateUser from "../midllewares/validateUser.js";

router.post("/signup", validateUser, userController.signup);
router.post("/login", validateUser, userController.login);

export default router;
