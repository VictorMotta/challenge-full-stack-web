/*
  Warnings:

  - You are about to drop the column `student_id` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration_number]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registration_number` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "student_id",
ADD COLUMN     "registration_number" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_registration_number_key" ON "students"("registration_number");
