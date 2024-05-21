/*
  Warnings:

  - Made the column `start_date` on table `timecards` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "timecards" ALTER COLUMN "start_date" SET NOT NULL;
