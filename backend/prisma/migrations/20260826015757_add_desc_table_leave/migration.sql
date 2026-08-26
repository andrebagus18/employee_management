/*
  Warnings:

  - Added the required column `descrption` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leaverequest` ADD COLUMN `descrption` TEXT NOT NULL;
