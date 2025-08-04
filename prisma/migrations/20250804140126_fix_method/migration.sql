/*
  Warnings:

  - You are about to drop the column `paymentsMethod` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "paymentsMethod";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'AWAITING_CONFIRM';
