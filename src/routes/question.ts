import { Router } from "express";
import { verifyApiKey } from "../middleware/veridyApiKey";
import {
  useAnswer,
  useQuestion,
  addNewQuestion,
  addNewQuestionTemplate,
} from "../controllers/useQuestion";

const router = Router();
//api/question
router.post("/answer", useAnswer);
router.post("/newquestion", verifyApiKey, addNewQuestion);
router.post("/newtemplate", verifyApiKey, addNewQuestionTemplate);
router.get("/", useQuestion);

export default router;
