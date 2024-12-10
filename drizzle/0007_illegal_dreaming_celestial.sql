ALTER TABLE "message" ALTER COLUMN "createDate" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "createDate" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "updateDate" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "updateDate" DROP DEFAULT;