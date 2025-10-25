import { Request, Response } from "express";
import { saveUserService, getUserByTelegramId } from "../services/UserService";
import { ITelegramUser } from "../interfaces/userInterface";

export const useUser = async (req: Request, res: Response) => {
  try {
    const userObj: ITelegramUser = req.body;
    if (!userObj) throw new Error("Данные не пришли");
    const user = await saveUserService(userObj);
    if (user) {
      res.status(200).json({ message: "Всё отлично!", success: true });
    } else {
      res.status(400).json({ error: "Всё плохо!", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: "Всё плохо!", success: false });
  }
};

export const useCheck = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.userId);
    if (!userId) throw new Error("Данные не пришли");
    const user = await getUserByTelegramId(userId);
    console.log("в useUser");
    console.log(user);
    res.status(200).json({ isRegistered: user ? true : false });
  } catch (error) {
    res.status(400).json({ error: "Всё плохо!" });
  }
};
