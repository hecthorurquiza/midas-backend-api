/*
  Warnings:

  - Added the required column `user_id` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "strategy_sites" DROP CONSTRAINT "strategy_sites_site_id_fkey";

-- DropForeignKey
ALTER TABLE "strategy_tokens" DROP CONSTRAINT "strategy_tokens_token_id_fkey";

-- DropIndex
DROP INDEX "commodities_code_key";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "strategy_tokens" ADD CONSTRAINT "strategy_tokens_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_sites" ADD CONSTRAINT "strategy_sites_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
