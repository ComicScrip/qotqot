/*
  Warnings:

  - You are about to drop the column `cartValidation` on the `customerCartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customerCartItem` DROP COLUMN `cartValidation`;

-- CreateTable
CREATE TABLE `order` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NULL,
    `idProduct` VARCHAR(255) NULL,
    `idClient` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
