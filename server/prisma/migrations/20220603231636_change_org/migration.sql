/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_organizationId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "organizationId",
ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "_CategoryToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToOrganization_AB_unique" ON "_CategoryToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToOrganization_B_index" ON "_CategoryToOrganization"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToOrganization" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToOrganization" ADD FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
