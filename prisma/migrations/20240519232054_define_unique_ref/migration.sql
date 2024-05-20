/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_ref_key" ON "users"("ref");
