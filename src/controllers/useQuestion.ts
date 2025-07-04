import { Request, Response } from "express";
import { IAnswer, IForAddNewQuestion } from "../interfaces/userInterface";
import {
  answerService,
  getQuestions,
  addNewQuestionInBD,
} from "../services/saveDataService";

export const useQuestion = async (req: Request, res: Response) => {
  const userId = Number(req.query.userId);
  if (!userId) {
    res.status(400).json({ error: "Пользователь не найден" });
  }
  try {
    const twentyFourHourAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const questions = await getQuestions(userId, twentyFourHourAgo);
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: "Всё плохо!" });
  }
};

export const useAnswer = async (req: Request, res: Response) => {
  const answerData: IAnswer = req.body;
  try {
    if (!answerData.questionId || !answerData.optionId || !answerData.userId) {
      throw new Error("Данные не пришли");
    }

    await answerService(
      answerData.userId,
      answerData.questionId,
      answerData.optionId
    );
    res.status(200).json({ message: "Ответ принят" });
  } catch (error) {
    res.status(400).json({ error: "Всё плохо!" });
  }
};

export const addNewQuestion = async (req: Request, res: Response) => {
  const question: IForAddNewQuestion = req.body;
  try {
    if (!question) {
      throw new Error("Данные от пользователя не пришли");
    }
    console.log("мы в useQuest");
    console.log(question);
    await addNewQuestionInBD(question);
    res.status(200).json({ message: "Ответ принят" });
  } catch (error) {
    res.status(400).json({ error: "Всё плохо!" });
  }
};
