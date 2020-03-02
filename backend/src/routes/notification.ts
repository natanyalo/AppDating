import { Router } from "express";
import {getMatch,createMatch,hideNotification} from '../controllers/notification/notificationMatch';
import {getMeassage,createMessage} from '../controllers/notification/notificationMessage'
import checkAuth from "../middleware/check-auth";
const router = Router();
// next for to prevent sitution that the code stack because it
// is not send back response


router.get("/match", checkAuth ,getMatch);
router.post("/match", checkAuth, createMatch);
router.put("/match", checkAuth, hideNotification,getMatch);

router.get("/message", checkAuth, getMeassage);
router.post("/message", checkAuth, createMessage);
router.put("/message", checkAuth, createMessage,getMeassage);
export default router;