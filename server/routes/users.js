import express from "express";
import { signIn, signUp } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
