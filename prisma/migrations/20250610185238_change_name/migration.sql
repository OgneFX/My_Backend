/*
  Warnings:

  - You are about to drop the column `language_code` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "language_code",
ADD COLUMN     "languageCode" TEXT;
