/*
  Warnings:

  - Made the column `quantity` on table `customerCartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idProduct` on table `customerCartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idClient` on table `customerCartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `customerCartItem` MODIFY `quantity` DOUBLE NOT NULL,
    MODIFY `idProduct` VARCHAR(255) NOT NULL,
    MODIFY `idClient` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `customerCartItem` ADD CONSTRAINT `customerCartItem_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
