import { prisma } from "../prisma/client";
export const answerService = async (userId, questionId, optionId) => {
    const checkAnswer = await prisma.answerLog.findUnique({
        where: {
            userId_questionId: { userId, questionId },
        },
    });
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
export const getQuestions = async (userId) => {
    const now = new Date();
    // 1. Получаем данные пользователя (регион и подписки)
    const user = await prisma.user.findUnique({
        where: { telegramId: userId },
        select: {
            regionIndex: true,
            following: {
                select: {
                    followingId: true,
                },
            },
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    // 2. Получаем ID авторов, на которых подписан пользователь
    const followingIds = user.following.map((f) => f.followingId);
    // 3. Получаем ID вопросов, на которые пользователь уже ответил
    const answered = await prisma.answerLog.findMany({
        where: { userId },
        select: { questionId: true },
    });
    const answeredIds = answered.map((a) => a.questionId);
    // 4. Теперь получаем активные вопросы, на которые пользователь ещё не ответил
    const questions = await prisma.question.findMany({
        where: {
            activeUntil: {
                gt: now, // активен до этого времени
            },
            id: {
                notIn: answeredIds, // исключаем уже отвеченные
            },
            OR: [
                {
                    regionIndex: {
                        in: [user.regionIndex, 0],
                    },
                },
                {
                    authorId: {
                        in: followingIds,
                    },
                },
            ],
        },
        include: {
            options: true,
            author: {
                select: {
                    username: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    console.log("ОТДАЕМ ВОПРОСЫ", questions);
    return questions;
};
export const addNewQuestionInBD = async (questionIn) => {
    if (!questionIn) {
        throw new Error("данные не пришли");
    }
    try {
        const result = await prisma.$transaction(async (tx) => {
            const createdQuestion = await tx.question.create({
                data: {
                    title: questionIn.title,
                    question: questionIn.question,
                    multiSelect: questionIn.multiSelect,
                    category: questionIn.category,
                    imageUrl: questionIn.imageUrl,
                    isRecurring: questionIn.isRecurring,
                    activeUntil: questionIn.activeUntil,
                    authorId: questionIn.authorId,
                    createdAt: new Date(),
                },
                select: {
                    id: true,
                },
            });
            console.log("Мы работаем с БД");
            console.log(questionIn);
            const createdOptions = await tx.questionOption.createMany({
                data: questionIn.answers.map((text) => ({
                    text,
                    questionId: createdQuestion.id,
                    votes: 0,
                })),
            });
            return {
                questionId: createdQuestion.id,
                optionsCount: createdOptions.count,
            };
        });
        return result;
    }
    catch (error) {
        console.error("Error creating question with options:", error);
    }
};
// services/saveDataService.ts
export const cloneRecurringQuestions = async () => {
    const now = new Date();
    //  Находим все активные шаблоны
    const templates = await prisma.questionTemplate.findMany({
        where: {
            isActive: true,
            startAt: { lte: now },
        },
        include: {
            options: true,
            author: true,
        },
    });
    // Клонируем каждый вопрос
    for (const template of templates) {
        const nextGenerateDate = new Date(template.lastGenerated);
        nextGenerateDate.setDate(nextGenerateDate.getDate() + template.activeDuration);
        if (now >= nextGenerateDate) {
            await createQuestionFromTemplate(template, now);
        }
    }
};
const createQuestionFromTemplate = async (template, now) => {
    const activeUntil = new Date(now);
    activeUntil.setDate(activeUntil.getDate() + template.activeDuration);
    const newQuestion = await prisma.question.create({
        data: {
            title: template.title,
            question: template.question,
            category: template.category,
            imageUrl: template.imageUrl,
            multiSelect: template.multiSelect,
            regionIndex: template.regionIndex,
            authorId: template.authorId,
            isRecurring: true,
            createdAt: now,
            activeUntil,
            templateId: template.id,
            options: {
                create: template.options.map((opt) => ({
                    text: opt.text,
                })),
            },
        },
    });
    await prisma.questionTemplate.update({
        where: { id: template.id },
        data: { lastGenerated: now },
    });
};
