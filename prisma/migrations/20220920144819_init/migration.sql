-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'CANCELLED', 'AWAITED');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT,
    "name" TEXT,
    "status" "Status" NOT NULL DEFAULT 'AWAITED',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
