CREATE DATABASE company;

\c company;

CREATE TABLE "clients" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    CONSTRAINT "PK_Clients" PRIMARY KEY ("id")
);

ALTER TABLE "clients"
ADD COLUMN "coordinate_x" integer NOT NULL,
ADD COLUMN "coordinate_y" integer NOT NULL;

CREATE DATABASE test;

\c test;

CREATE TABLE "clients" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    CONSTRAINT "PK_Clients" PRIMARY KEY ("id")
);

ALTER TABLE "clients"
ADD COLUMN "coordinate_x" integer NOT NULL,
ADD COLUMN "coordinate_y" integer NOT NULL;