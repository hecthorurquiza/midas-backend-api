-- DropForeignKey
ALTER TABLE "strategy_sites" DROP CONSTRAINT "strategy_sites_strategy_id_fkey";

-- DropForeignKey
ALTER TABLE "strategy_tokens" DROP CONSTRAINT "strategy_tokens_strategy_id_fkey";

-- AddForeignKey
ALTER TABLE "strategy_tokens" ADD CONSTRAINT "strategy_tokens_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "strategies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_sites" ADD CONSTRAINT "strategy_sites_strategy_id_fkey" FOREIGN KEY ("strategy_id") REFERENCES "strategies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
