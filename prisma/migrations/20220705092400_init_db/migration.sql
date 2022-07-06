-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NULL,
    `price` DOUBLE NULL,
    `pricePerKg` DOUBLE NULL,
    `stock` VARCHAR(255) NULL,
    `codeProduit` VARCHAR(255) NULL,
    `weight` VARCHAR(255) NULL,
    `picture` TEXT NULL,
    `makerPicture` TEXT NULL,
    `makerName` VARCHAR(255) NULL,
    `makerAdress` VARCHAR(255) NULL,
    `descriptionProduit` TEXT NULL,
    `descriptionProducteur` TEXT NULL,
    `logo` VARCHAR(255) NULL,
    `category` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerCartItem` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NULL,
    `idProduct` VARCHAR(255) NULL,
    `idClient` VARCHAR(255) NULL,

    UNIQUE INDEX `customerCartItem_idProduct_idClient_key`(`idProduct`, `idClient`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
