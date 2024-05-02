-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "privacy" SET DEFAULT 'friends';
