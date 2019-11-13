import { Router } from "express";
import { getProfile, saveProfile, upDateProfile } from "../controllers/profile";
import checkAuth from "../middleware/check-auth";
import middlewarFile from "../middleware/file";

const router = Router();
// function call without () is mean ref to function
router.post("", checkAuth, middlewarFile, saveProfile);
router.put("", checkAuth, middlewarFile, upDateProfile);
router.get("", checkAuth, getProfile);

export default router;
