/*
  Warnings:

  - You are about to drop the column `idClient` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customerCartItem` ADD COLUMN `idOrder` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `idClient`,
    DROP COLUMN `idProduct`,
    DROP COLUMN `quantity`;

-- AddForeignKey
ALTER TABLE `customerCartItem` ADD CONSTRAINT `customerCartItem_idOrder_fkey` FOREIGN KEY (`idOrder`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
