ALTER TABLE "message" ADD COLUMN "createDate" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "updateDate" timestamp DEFAULT now();