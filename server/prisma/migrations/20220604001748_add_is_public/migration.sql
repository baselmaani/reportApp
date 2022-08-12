/*
  Warnings:

  - You are about to drop the column `img` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "img",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
