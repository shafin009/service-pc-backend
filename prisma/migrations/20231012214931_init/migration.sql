/*
  Warnings:

  - The values [shipped,delivered] on the enum `bookingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "bookingStatus_new" AS ENUM ('pending', 'accepted', 'cancelled');
ALTER TABLE "Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "status" TYPE "bookingStatus_new" USING ("status"::text::"bookingStatus_new");
ALTER TYPE "bookingStatus" RENAME TO "bookingStatus_old";
ALTER TYPE "bookingStatus_new" RENAME TO "bookingStatus";
DROP TYPE "bookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;
