import { Request, Response } from "express";
import { saveDataService } from "../services/saveData";
import { ITelegramUser } from "../interfaces/userInterface";

export const Test = async (req: Request, res: Response) => {
  try {
    const userObj: ITelegramUser = req.body;
    if (!userObj) throw new Error("Данные не пришли");
    await saveDataService(userObj);
    res.status(200).json({ message: "Всё отлично!" });
  } catch (error) {
    res.status(400).json({ error: "Всё плохо!" });
  }
};
