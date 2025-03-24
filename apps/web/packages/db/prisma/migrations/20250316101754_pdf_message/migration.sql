/*
  Warnings:

  - Added the required column `message` to the `Pdf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pdf" ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
