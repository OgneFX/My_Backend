import { Request, Response } from "express";
import {
  saveDataService,
  getUserByTelegramId,
} from "../services/saveDataService";
import { ITelegramUser } from "../interfaces/userInterface";

export const useUser = async (req: Request, res: Response) => {
  try {
    const userObj: ITelegramUser = req.body;
    if (!userObj) throw new Error("Данные не пришли");
    await saveDataService(userObj);
    res.status(200).json({ message: "Всё отлично!" });
  } catch (error) {
    res.status(400).json({ error: "Всё плохо!" });
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
