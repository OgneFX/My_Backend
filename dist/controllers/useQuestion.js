const mockQuestions = [
    {
        id: 1,
        title: "Здоровье",
        question: "Как вы себя сегодня чувствуете?",
        options: [
            { id: 1, text: "Отлично" },
            { id: 2, text: "Нормально" },
            { id: 3, text: "Плохо" },
        ],
        multiSelect: false,
        category: "health",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFFGdhkIOkXMSxS7ppzG7tt_UX-Y4E2sznA&s",
    },
    {
        id: 2,
        title: "Настроение",
        question: "Какое у вас настроение?",
        options: [
            { id: 1, text: "Весёлое" },
            { id: 2, text: "Спокойное" },
            { id: 3, text: "Грустное" },
        ],
        multiSelect: false,
        category: "mood",
    },
];
export const useQuestion = async (req, res) => {
    try {
        res.json(mockQuestions);
        console.log("we are here");
        console.log(mockQuestions);
    }
    catch (error) {
        res.status(400).json({ error: "Всё плохо!" });
    }
};
export const useAnswer = async (req, res) => {
    try {
        const answerData = req.body;
        if (!answerData.questionId || !answerData.optionId || !answerData.userId)
            throw new Error("Данные не пришли");
        console.log("Данные с фронта");
        console.log(answerData.questionId);
        console.log(answerData.optionId);
        console.log(answerData.userId);
        res.status(200).json({ message: "Ответ принят" });
    }
    catch (error) {
        res.status(400).json({ error: "Всё плохо!" });
    }
};
