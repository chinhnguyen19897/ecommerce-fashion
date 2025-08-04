/*
  Warnings:

  - You are about to drop the column `paymentId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_orderId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "paymentId";
