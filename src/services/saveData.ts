import { ITelegramUser } from "../interfaces/userInterface";

let storedData: any = "";
export const saveDataService = async (data: ITelegramUser) => {
  storedData = data;
  console.log("Data saved:", data);
};
