import { ITelegramUser } from "../interfaces/userInterface";
import { prisma } from "../prisma/client";

export const saveUserService = async (data: ITelegramUser) => {
  const user = await prisma.user.create({
    data: {
      telegramId: data.tgWebAppData.user.id,
      firstName: data.tgWebAppData.user.first_name || "",
      lastName: data.tgWebAppData.user.last_name || "",
      username: data.tgWebAppData.user.username || "",
      photo: data.tgWebAppData.user.photo_url || "",
      languageCode: data.tgWebAppData.user.language_code || "",
      regionIndex: data.regionIndex,
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
  console.log("получили с бд что то");
  console.log(user);
  return user;
};
