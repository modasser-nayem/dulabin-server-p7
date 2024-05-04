-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "parentCommentId" TEXT;

-- CreateTable
CREATE TABLE "friendships" (
    "userId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "following" BOOLEAN NOT NULL DEFAULT true,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("userId","requestId")
);

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
