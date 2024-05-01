-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_commentId_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "status" SET DEFAULT 'unhide';

-- AlterTable
ALTER TABLE "reactions" ALTER COLUMN "commentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "photoURL" DROP NOT NULL,
ALTER COLUMN "dateOfBirth" DROP NOT NULL,
ALTER COLUMN "lastLoginAt" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
