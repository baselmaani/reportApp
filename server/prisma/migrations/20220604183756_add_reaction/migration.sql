/*
  Warnings:

  - Added the required column `sourceType` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "sourceType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "isHandled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "reportReaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reportReaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reportReaction" ADD CONSTRAINT "reportReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportReaction" ADD CONSTRAINT "reportReaction_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
