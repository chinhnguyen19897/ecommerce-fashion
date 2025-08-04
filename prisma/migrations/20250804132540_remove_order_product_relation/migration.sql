/*
  Warnings:

  - You are about to drop the column `productId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_productId_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_productId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
