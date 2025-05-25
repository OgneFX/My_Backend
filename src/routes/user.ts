import { Router } from "express";
import { Test } from "../controllers/useTest";

const router = Router();

router.post("/", Test); // POST /api/user

export default router;
