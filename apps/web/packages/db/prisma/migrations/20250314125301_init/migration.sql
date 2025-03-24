-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "usedId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
