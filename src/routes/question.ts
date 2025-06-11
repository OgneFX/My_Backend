import { Router } from "express";
import { useAnswer, useQuestion } from "../controllers/useQuestion";

const router = Router();
//api/question
router.post("/answer", useAnswer);
router.get("/", useQuestion);

export default router;
