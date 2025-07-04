import { Router } from "express";
import { verifyApiKey } from "../middleware/veridyApiKey";
import { useAnswer, useQuestion, addNewQuestion, } from "../controllers/useQuestion";
const router = Router();
//api/question
router.post("/answer", useAnswer);
router.post("/newquestion", verifyApiKey, addNewQuestion);
router.get("/", useQuestion);
export default router;
