// utils/cron.ts
import cron from "node-cron";
import { cloneRecurringQuestions } from "../services/UserService";

export const startCronJobs = () => {
  // Каждый день в 00:00
  cron.schedule(
    "1 * * * *",
    async () => {
      console.log("Running daily question cloning...");
      try {
        await cloneRecurringQuestions();
      } catch (error) {
        console.error("Error cloning questions:", error);
      }
    },
    {
      timezone: "Europe/Moscow",
    }
  );
};
