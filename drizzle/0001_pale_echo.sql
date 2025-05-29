CREATE TABLE IF NOT EXISTS "ASINs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ASINs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"asin" varchar(20) NOT NULL,
	"category" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" varchar(255) DEFAULT '2025-05-25T06:18:07.130Z' NOT NULL,
	CONSTRAINT "ASINs_asin_unique" UNIQUE("asin"),
	CONSTRAINT "ASINs_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sales_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"asin" varchar(20) NOT NULL,
	"date" varchar(255) NOT NULL,
	"sales_count" integer NOT NULL
);
