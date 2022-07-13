-- AlterTable
ALTER TABLE `customerCartItem` ADD COLUMN `codeProduit` VARCHAR(255) NULL,
    ADD COLUMN `name` VARCHAR(255) NULL,
    ADD COLUMN `picture` TEXT NULL,
    ADD COLUMN `price` DOUBLE NULL,
    ADD COLUMN `pricePerKg` DOUBLE NULL,
    ADD COLUMN `stock` VARCHAR(255) NULL,
    ADD COLUMN `weight` VARCHAR(255) NULL;
