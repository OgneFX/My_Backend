import { Router } from "express";
import { useUser, useCheck } from "../controllers/useUser";
const router = Router();
router.post("/", useUser); // POST /api/user
router.get("/check", useCheck); // GET /api/user/check чекает зареган ли пользователь или нет
export default router;
