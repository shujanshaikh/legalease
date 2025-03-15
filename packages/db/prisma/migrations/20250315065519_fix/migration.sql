/*
  Warnings:

  - You are about to drop the `MessageHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_messageId_fkey";

-- DropTable
DROP TABLE "MessageHistory";
