/*
  Warnings:

  - You are about to drop the column `repeatEvery` on the `QuestionTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `repeatUnit` on the `QuestionTemplate` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `QuestionTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Question_templateId_idx";

-- DropIndex
DROP INDEX "QuestionOption_questionId_idx";

-- DropIndex
DROP INDEX "QuestionOptionTemplate_templateId_idx";

-- DropIndex
DROP INDEX "QuestionTemplate_category_idx";

-- DropIndex
DROP INDEX "QuestionTemplate_createdAt_idx";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "regionIndex" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "QuestionTemplate" DROP COLUMN "repeatEvery",
DROP COLUMN "repeatUnit",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastGenerated" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateIndex
CREATE INDEX "QuestionTemplate_isActive_lastGenerated_idx" ON "QuestionTemplate"("isActive", "lastGenerated");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTemplate" ADD CONSTRAINT "QuestionTemplate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
