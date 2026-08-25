/*
  Warnings:

  - You are about to alter the column `status` on the `leaverequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- DropForeignKey
ALTER TABLE `leaverequest` DROP FOREIGN KEY `LeaveRequest_approverId_fkey`;

-- DropForeignKey
ALTER TABLE `leaverequest` DROP FOREIGN KEY `LeaveRequest_reviewedBy_fkey`;

-- DropIndex
DROP INDEX `LeaveRequest_approverId_fkey` ON `leaverequest`;

-- DropIndex
DROP INDEX `LeaveRequest_reviewedBy_fkey` ON `leaverequest`;

-- AlterTable
ALTER TABLE `leaverequest` MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    MODIFY `reviewedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_approverId_fkey` FOREIGN KEY (`approverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_reviewedBy_fkey` FOREIGN KEY (`reviewedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
