/*
  Warnings:

  - You are about to drop the column `amount` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_paymentId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "amount",
ALTER COLUMN "province" DROP NOT NULL,
ALTER COLUMN "wards" DROP NOT NULL,
ALTER COLUMN "paymentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
