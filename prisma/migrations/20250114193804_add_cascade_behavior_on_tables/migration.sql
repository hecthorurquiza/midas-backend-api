-- DropForeignKey
ALTER TABLE "group_participants" DROP CONSTRAINT "group_participants_group_id_fkey";

-- DropForeignKey
ALTER TABLE "strategies" DROP CONSTRAINT "strategies_commodity_id_fkey";

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_commodity_id_fkey" FOREIGN KEY ("commodity_id") REFERENCES "commodities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_participants" ADD CONSTRAINT "group_participants_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
