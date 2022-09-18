-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('LOW', 'MID', 'HIGH');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "importance" "Importance" NOT NULL DEFAULT 'MID',
    "responsable" TEXT NOT NULL,
    "marked" BOOLEAN NOT NULL DEFAULT false,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_completed" TIMESTAMP(3),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Task_importance_marked_date_created_idx" ON "Task"("importance", "marked", "date_created");
