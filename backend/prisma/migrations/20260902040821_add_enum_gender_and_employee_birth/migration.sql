/*
  Warnings:

  - You are about to alter the column `gender` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `date_birth` DATE NULL,
    ADD COLUMN `place_birth` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE';
