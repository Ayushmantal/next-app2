/*
  Warnings:

  - You are about to drop the column `info` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `info`,
    ADD COLUMN `provider` VARCHAR(191) NULL;
