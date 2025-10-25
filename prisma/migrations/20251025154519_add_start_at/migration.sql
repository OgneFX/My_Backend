/*
  Warnings:

  - Added the required column `startAt` to the `QuestionTemplate` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastGenerated` on table `QuestionTemplate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "QuestionTemplate" ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "lastGenerated" SET NOT NULL;
