import { answerService, getQuestions, addNewQuestionInBD, addNewQuestionTemplateInBD, } from "../services/QuestionService";
export const useQuestion = async (req, res) => {
    const userId = Number(req.query.userId);
    if (!userId) {
        res.status(400).json({ error: "Пользователь не найден" });
    }
    try {
        const questions = await getQuestions(userId);
        res.status(200).json(questions);
    }
    catch (error) {
        res.status(400).json({ error: "Всё плохо!" });
    }
};
export const useAnswer = async (req, res) => {
    const answerData = req.body;
    try {
        if (!answerData.questionId || !answerData.optionId || !answerData.userId) {
            throw new Error("Данные не пришли");
        }
        await answerService(answerData.userId, answerData.questionId, answerData.optionId);
        res.status(200).json({ message: "Ответ принят" });
    }
    catch (error) {
        res.status(400).json({ error: "Всё плохо!" });
    }
};
export const addNewQuestion = async (req, res) => {
    const question = req.body;
    try {
        if (!question) {
            throw new Error("Данные от пользователя не пришли");
        }
        console.log("мы в useQuest");
        console.log(question);
        await addNewQuestionInBD(question);
        res.status(200).json({ message: "Ответ принят" });
    }
    catch (error) {
        res.status(400).json({ error: "Всё плохо!" });
    }
};
export const addNewQuestionTemplate = async (req, res) => {
    try {
        const result = await addNewQuestionTemplateInBD(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Ошибка при создании шаблона", error });
    }
};
