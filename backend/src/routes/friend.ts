import { Router } from "express";

import checkAuth from "../middleware/check-auth";
import { getFriends } from "../controllers/friend";

const router = Router();

router.get("", checkAuth ,getFriends);

export default router;