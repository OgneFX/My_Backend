import { ITelegramUser } from "../interfaces/userInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const saveDataService = async (data: ITelegramUser) => {
  const user = await prisma.user.create({
    data: {
      telegramId: data.tgWebAppData.user.id,
      firstName: data.tgWebAppData.user.first_name || "",
      lastName: data.tgWebAppData.user.last_name || "",
      username: data.tgWebAppData.user.username || "",
      photo: data.tgWebAppData.user.photo_url || "",
      languageCode: data.tgWebAppData.user.language_code || "",
    },
  });
  return user;
};

export const getUserByTelegramId = async (telegramId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      telegramId: telegramId,
    },
  });
  return user;
};

export const answerService = async (
  userId: number,
  questionId: number,
  optionId: number
) => {
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

export const getQuestions = async (userId: number, twentyFourHourAgo: Date) => {
  const allQuestions = await prisma.question.findMany({
    where: {
      createdAt: {
        gte: twentyFourHourAgo,
      },
    },
    include: {
      options: true,
    },
  });

  const answeredQuestions = await prisma.answerLog.findMany({
    where: {
      userId,
      questionId: {
        in: allQuestions.map((q) => q.id),
      },
    },
    select: {
      questionId: true,
    },
  });

  const answeredIds = answeredQuestions.map((a) => a.questionId);
  const unansweredQuestions = allQuestions.filter(
    (q) => !answeredIds.includes(q.id)
  );

  return unansweredQuestions;
};
