CREATE TABLE "team" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_number" integer DEFAULT 99 NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"email" text,
	"bio" text,
	"image_url" text,
	"linkedin" text,
	"gradient" text DEFAULT 'sky' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
