/*
  Warnings:

  - You are about to drop the column `codeProduit` on the `customerCartItem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customerCartItem` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `customerCartItem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `customerCartItem` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerKg` on the `customerCartItem` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `customerCartItem` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `customerCartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customerCartItem` DROP COLUMN `codeProduit`,
    DROP COLUMN `name`,
    DROP COLUMN `picture`,
    DROP COLUMN `price`,
    DROP COLUMN `pricePerKg`,
    DROP COLUMN `stock`,
    DROP COLUMN `weight`;
