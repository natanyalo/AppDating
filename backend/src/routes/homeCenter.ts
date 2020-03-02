import { Router } from "express";
import { addWant, getUsers } from "../controllers/homeCenter";
import checkAuth from "../middleware/check-auth";

const router = Router();

// next for to prevent sitution that the code stack because it
// is not send back response
router.get("", checkAuth ,getUsers);
router.post("/want", checkAuth, addWant);
export default router;
