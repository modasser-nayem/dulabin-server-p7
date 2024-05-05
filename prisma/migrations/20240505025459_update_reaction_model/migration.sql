-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_postId_fkey";

-- AlterTable
ALTER TABLE "reactions" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
