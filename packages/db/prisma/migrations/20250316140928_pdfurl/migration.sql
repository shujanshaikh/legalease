/*
  Warnings:

  - You are about to drop the column `fileName` on the `Pdf` table. All the data in the column will be lost.
  - Added the required column `pdfUrl` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pdf" DROP COLUMN "fileName",
ADD COLUMN     "pdfUrl" TEXT NOT NULL;
