/*
  Warnings:

  - You are about to drop the column `role` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `usedId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `messageId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('USER', 'SYSTEM');

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "role",
DROP COLUMN "usedId",
ADD COLUMN     "crearedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "messageId" TEXT NOT NULL,
ADD COLUMN     "type" "MessageType" NOT NULL;

-- CreateTable
CREATE TABLE "MessageHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "MessageHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
