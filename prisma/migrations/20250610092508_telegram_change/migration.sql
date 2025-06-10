-- DropForeignKey
ALTER TABLE "AnswerLog" DROP CONSTRAINT "AnswerLog_userId_fkey";

-- AddForeignKey
ALTER TABLE "AnswerLog" ADD CONSTRAINT "AnswerLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
