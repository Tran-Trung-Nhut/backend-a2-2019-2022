CREATE TABLE IF NOT EXISTS "meeting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timeDescription" (
	"meetingId" uuid NOT NULL,
	"time" varchar(255) NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "pkTimeDescription " PRIMARY KEY("meetingId","time","description")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"phoneNumber" varchar(255),
	CONSTRAINT "user_phoneNumber_unique" UNIQUE("phoneNumber")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userMeeting" (
	"userId" uuid NOT NULL,
	"meetingId" uuid NOT NULL,
	CONSTRAINT "pkUserMeeting" PRIMARY KEY("userId","meetingId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timeDescription" ADD CONSTRAINT "timeDescription_meetingId_meeting_id_fk" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userMeeting" ADD CONSTRAINT "userMeeting_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userMeeting" ADD CONSTRAINT "userMeeting_meetingId_meeting_id_fk" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
