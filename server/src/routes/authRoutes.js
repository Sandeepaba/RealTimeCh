import { Router } from "express";
import { login, logout, me, register, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { asyncHandler as a } from "../middleware/asyncHandler.js";

const router = Router();
router.post("/register", a(register));
router.post("/login", a(login));
router.get("/me", protect, a(me));
router.post("/logout", protect, a(logout));
router.patch("/profile", protect, a(updateProfile));
export default router;
