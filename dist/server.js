import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import questionRoutes from "./routes/question";
import { startCronJobs } from "./utils/cron";
dotenv.config();
const app = express(); //Инициализировали express
const PORT = process.env.PORT; // установили порт
startCronJobs();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-frontend-domain.vercel.app",
    ], // 👈 разрешённые источники
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-api-key"], // 👈 обязательно включи свой кастомный заголовок
    credentials: true,
})); //разробраться с CORS
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
