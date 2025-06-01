import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import questionRoutes from "./routes/question";

dotenv.config();

const app = express(); //Инициализировали express
const PORT = process.env.PORT; // установили порт

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
