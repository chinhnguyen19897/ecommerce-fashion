/*
  Warnings:

  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stocks` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "color",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "size" TEXT[],
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "stocks" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Colors" (
    "id" SERIAL NOT NULL,
    "nameColor" TEXT NOT NULL,
    "code" TEXT,
    "image" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "Colors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Colors" ADD CONSTRAINT "Colors_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
