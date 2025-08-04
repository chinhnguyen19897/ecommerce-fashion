/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_paymentId_fkey";

-- DropIndex
DROP INDEX "order_paymentId_key";

-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "orderId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "payment_orderId_key" ON "payment"("orderId");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
