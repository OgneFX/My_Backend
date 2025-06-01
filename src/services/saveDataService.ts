import { ITelegramUser } from "../interfaces/userInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const saveDataService = async (data: ITelegramUser) => {
  const user = await prisma.user.create({
    data: {
      telegramId: data.tgWebAppData.user.id.toString(),
      firstName: data.tgWebAppData.user.first_name,
      lastName: data.tgWebAppData.user.last_name,
      username: data.tgWebAppData.user.username,
    },
  });
  return user;
};

export const getUserByTelegramId = async (telegramId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      telegramId: telegramId.toString(),
    },
  });
  return user;
};
