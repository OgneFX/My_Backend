import { saveDataService } from "../services/saveData";
export const Test = async (req, res) => {
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
