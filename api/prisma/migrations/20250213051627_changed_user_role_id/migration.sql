/*
  Warnings:

  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_id",
ADD COLUMN     "role" "RolesNames" NOT NULL;
