import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handleUser = async (req: Request, res: Response) => {
  const { telegramUser, regionIndex } = req.body;

  if (!telegramUser || !telegramUser.id) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { telegramId: telegramUser.id.toString() },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramId: telegramUser.id.toString(),
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          username: telegramUser.username,
          regionIndex: regionIndex,
        },
      });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
