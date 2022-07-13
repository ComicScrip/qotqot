/*
  Warnings:

  - Made the column `idOrder` on table `customerCartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `customerCartItem_idOrder_fkey` ON `customerCartItem`;

-- AlterTable
ALTER TABLE `customerCartItem` MODIFY `idOrder` VARCHAR(255) NOT NULL DEFAULT '';
