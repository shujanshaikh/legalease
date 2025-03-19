/*
  Warnings:

  - Added the required column `fileName` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pdf" ADD COLUMN     "fileName" TEXT NOT NULL;
