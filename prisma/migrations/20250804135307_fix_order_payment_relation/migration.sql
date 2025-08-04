/*
  Warnings:

  - You are about to drop the column `method` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `payment` table. All the data in the column will be lost.
  - Added the required column `paymentsMethod` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentsMethod` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "method",
ADD COLUMN     "paymentsMethod" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "method",
ADD COLUMN     "paymentsMethod" TEXT NOT NULL;
