-- CreateEnum
CREATE TYPE "RepeatUnit" AS ENUM ('day', 'week', 'month');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "activeUntil" TIMESTAMP(3),
ADD COLUMN     "templateId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "regionIndex" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "QuestionTemplate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "multiSelect" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "regionIndex" INTEGER NOT NULL DEFAULT 0,
    "activeDuration" INTEGER NOT NULL,
    "repeatEvery" INTEGER NOT NULL,
    "repeatUnit" "RepeatUnit" NOT NULL,

    CONSTRAINT "QuestionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOptionTemplate" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "QuestionOptionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuestionTemplate_category_idx" ON "QuestionTemplate"("category");

-- CreateIndex
CREATE INDEX "QuestionTemplate_createdAt_idx" ON "QuestionTemplate"("createdAt");

-- CreateIndex
CREATE INDEX "QuestionOptionTemplate_templateId_idx" ON "QuestionOptionTemplate"("templateId");

-- CreateIndex
CREATE INDEX "AnswerLog_userId_idx" ON "AnswerLog"("userId");

-- CreateIndex
CREATE INDEX "AnswerLog_questionId_idx" ON "AnswerLog"("questionId");

-- CreateIndex
CREATE INDEX "AnswerLog_createdAt_idx" ON "AnswerLog"("createdAt");

-- CreateIndex
CREATE INDEX "Question_templateId_idx" ON "Question"("templateId");

-- CreateIndex
CREATE INDEX "Question_category_idx" ON "Question"("category");

-- CreateIndex
CREATE INDEX "Question_activeUntil_idx" ON "Question"("activeUntil");

-- CreateIndex
CREATE INDEX "Question_createdAt_idx" ON "Question"("createdAt");

-- CreateIndex
CREATE INDEX "QuestionOption_questionId_idx" ON "QuestionOption"("questionId");

-- CreateIndex
CREATE INDEX "User_telegramId_idx" ON "User"("telegramId");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- AddForeignKey
ALTER TABLE "QuestionOptionTemplate" ADD CONSTRAINT "QuestionOptionTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "QuestionTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "QuestionTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
