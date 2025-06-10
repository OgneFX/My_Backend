import { answerService, getQuestions } from "../services/saveDataService";
// const mockQuestions: IQuestion[] = [
//   {
//     id: 1,
//     title: "Здоровье",
//     question: "Как вы себя сегодня чувствуете?",
//     options: [
//       { id: 1, text: "Отлично" },
//       { id: 2, text: "Нормально" },
//       { id: 3, text: "Плохо" },
//     ],
//     multiSelect: false,
//     category: "health",
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFFGdhkIOkXMSxS7ppzG7tt_UX-Y4E2sznA&s",
//   },
//   {
//     id: 2,
//     title: "Настроение",
//     question: "Какое у вас настроение?",
//     options: [
//       { id: 1, text: "Весёлое" },
//       { id: 2, text: "Спокойное" },
//       { id: 3, text: "Грустное" },
//     ],
//     multiSelect: false,
//     category: "mood",
//   },
// ];
export const useQuestion = async (req, res) => {
    try {
        const questions = await getQuestions();
        res.json(questions);
        console.log("we are here");
        console.log(questions);
    }
    catch (error) {
        res.status(400).json({ error: "Всё плохо!" });
    }
};
export const useAnswer = async (req, res) => {
    const answerData = req.body;
    try {
        console.log("в контроллере");
        console.log(answerData);
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
