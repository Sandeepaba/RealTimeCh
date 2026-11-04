import { Router } from "express";
import { searchUsers } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { asyncHandler as a } from "../middleware/asyncHandler.js";

const router = Router();
router.get("/", protect, a(searchUsers));
export default router;
