import { Router } from "express";
import { useQuestion, useAnswer } from "../controllers/useQuestion";

const router = Router();

router.post("/answer", useAnswer);
router.get("/", useQuestion);

export default router;
