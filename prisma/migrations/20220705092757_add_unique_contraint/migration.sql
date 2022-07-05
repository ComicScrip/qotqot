/*
  Warnings:

  - A unique constraint covering the columns `[idProduct]` on the table `customerCartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idClient]` on the table `customerCartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `customerCartItem_idProduct_idClient_key` ON `customerCartItem`;

-- CreateIndex
CREATE UNIQUE INDEX `customerCartItem_idProduct_key` ON `customerCartItem`(`idProduct`);

-- CreateIndex
CREATE UNIQUE INDEX `customerCartItem_idClient_key` ON `customerCartItem`(`idClient`);
