-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `price` INTEGER NULL,
    `pricePerKg` INTEGER NULL,
    `stock` VARCHAR(191) NULL,
    `codeProduit` VARCHAR(191) NULL,
    `weight` VARCHAR(191) NULL,
    `picture` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `makerPicture` VARCHAR(191) NULL,
    `makerName` VARCHAR(191) NULL,
    `makerAdress` VARCHAR(191) NULL,
    `descriptionProduit` VARCHAR(191) NULL,
    `descriptionProducteur` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerCartItem` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NULL,
    `idProduct` VARCHAR(191) NULL,
    `idClient` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
