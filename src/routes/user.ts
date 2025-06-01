import { Router } from "express";
import { useTest, useCheck } from "../controllers/useTest";

const router = Router();

router.post("/", useTest); // POST /api/user
router.get("/check", useCheck); // GET /api/user/check чекает зареган ли пользователь или нет

export default router;
