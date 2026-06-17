ALTER TABLE `SalesOrder` ADD COLUMN `confirmedAt` DATETIME(3) NULL;

UPDATE `SalesOrder`
SET `confirmedAt` = `createdAt`
WHERE `confirmedAt` IS NULL
  AND `orderStatus` IN ('CONFIRMED', 'PACKING', 'SHIPPED', 'COMPLETED');
