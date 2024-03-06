CREATE DATABASE company;

\c company;

CREATE TABLE "clients" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    CONSTRAINT "PK_Clients" PRIMARY KEY ("id")
);

CREATE DATABASE test;

\c test;

CREATE TABLE "clients" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    CONSTRAINT "PK_Clients" PRIMARY KEY ("id")
);
