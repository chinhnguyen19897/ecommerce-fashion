/*
  Warnings:

  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "size",
ADD COLUMN     "sizes" TEXT[],
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "shortDescription" DROP NOT NULL,
ALTER COLUMN "sku" DROP NOT NULL;
