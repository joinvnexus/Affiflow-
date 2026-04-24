-- Make User.role nullable and remove default
ALTER TABLE "User"
  ALTER COLUMN "role" DROP DEFAULT,
  ALTER COLUMN "role" DROP NOT NULL;

-- Add paidAt timestamp for paid sales
ALTER TABLE "Sale"
  ADD COLUMN IF NOT EXISTS "paidAt" TIMESTAMP(3);

