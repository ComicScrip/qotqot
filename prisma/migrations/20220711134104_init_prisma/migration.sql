/*
  Warnings:

  - Added the required column `delivery` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `delivery` DATETIME(3) NOT NULL;
