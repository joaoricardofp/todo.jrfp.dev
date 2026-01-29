-- CreateTable
CREATE TABLE "Todos" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);
