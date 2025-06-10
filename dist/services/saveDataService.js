import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});
export const saveDataService = async (data) => {
    const user = await prisma.user.create({
        data: {
            telegramId: data.tgWebAppData.user.id,
            firstName: data.tgWebAppData.user.first_name || "",
            lastName: data.tgWebAppData.user.last_name || "",
            username: data.tgWebAppData.user.username || "",
        },
    });
    return user;
};
export const getUserByTelegramId = async (telegramId) => {
    const user = await prisma.user.findUnique({
        where: {
            telegramId: telegramId,
        },
    });
    return user;
};
export const answerService = async (userId, questionId, optionId) => {
    const checkAnswer = await prisma.answerLog.findUnique({
        where: {
            userId_questionId: { userId, questionId },
        },
    });
    console.log("в сервисе");
    console.log(checkAnswer);
    if (checkAnswer) {
        throw new Error("Пользователь уже ответил на этот вопрос");
    }
    await prisma.$transaction([
        prisma.questionOption.update({
            where: { id: optionId },
            data: { votes: { increment: 1 } },
        }),
        prisma.answerLog.create({
            data: {
                userId,
                questionId,
            },
        }),
    ]);
    return { success: true };
};
export const getQuestions = async () => {
    const questions = await prisma.question.findMany({
        include: {
            options: true,
        },
    });
    return questions;
};
