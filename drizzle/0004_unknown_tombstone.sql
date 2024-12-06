CREATE TABLE IF NOT EXISTS "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createDate" date DEFAULT now() NOT NULL,
	"updateDate" date DEFAULT now() NOT NULL,
	"content" text,
	"meetingId" uuid NOT NULL,
	"userName" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_meetingId_meeting_id_fk" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
