import { saveDataService } from "../services/saveDataService";
import { getUserByTelegramId } from "../services/saveDataService";
export const useTest = async (req, res) => {
    try {
        const userObj = req.body;
        if (!userObj)
            throw new Error("Данные не пришли");
        await saveDataService(userObj);
        res.status(200).json({ message: "Всё отлично!" });
    }
    catch (error) {
        res.status(400).json({ error: "Всё плохо!" });
    }
};
export const useCheck = async (req, res) => {
    try {
        console.log("дёргаем запрос чек");
        const userId = Number(req.query.userId);
        console.log(userId);
        if (!userId)
            throw new Error("Данные не пришли");
        const user = await getUserByTelegramId(userId);
        res.status(200).json({ isRegistered: !!user });
    }
    catch (error) {
        res.status(400).json({ error: "Всё плохо!" });
    }
};
