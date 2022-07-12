/*
  Warnings:

  - A unique constraint covering the columns `[idProduct,idClient,idOrder]` on the table `customerCartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `customerCartItem` DROP FOREIGN KEY `customerCartItem_idOrder_fkey`;

-- DropForeignKey
ALTER TABLE `customerCartItem` DROP FOREIGN KEY `customerCartItem_idProduct_fkey`;

-- DropIndex
DROP INDEX `customerCartItem_idProduct_idClient_key` ON `customerCartItem`;

-- CreateIndex
CREATE UNIQUE INDEX `customerCartItem_idProduct_idClient_idOrder_key` ON `customerCartItem`(`idProduct`, `idClient`, `idOrder`);
