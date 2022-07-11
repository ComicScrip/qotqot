-- DropForeignKey
ALTER TABLE `customerCartItem` DROP FOREIGN KEY `customerCartItem_idOrder_fkey`;

-- DropForeignKey
ALTER TABLE `customerCartItem` DROP FOREIGN KEY `customerCartItem_idProduct_fkey`;

-- AddForeignKey
ALTER TABLE `customerCartItem` ADD CONSTRAINT `customerCartItem_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerCartItem` ADD CONSTRAINT `customerCartItem_idOrder_fkey` FOREIGN KEY (`idOrder`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
