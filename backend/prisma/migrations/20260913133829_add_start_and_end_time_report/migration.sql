/*
  Warnings:

  - You are about to drop the column `date` on the `dailyreport` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `dailyreport` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `dailyreport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `report_date` to the `dailyreport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `dailyreport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dailyreport` DROP COLUMN `date`,
    DROP COLUMN `time`,
    ADD COLUMN `end_time` TIME(0) NOT NULL,
    ADD COLUMN `report_date` DATE NOT NULL,
    ADD COLUMN `start_time` TIME(0) NOT NULL;
