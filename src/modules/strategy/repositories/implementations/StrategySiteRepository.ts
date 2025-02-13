import { prismaClient } from '~/utils/prismaClient'
import { IStrategySiteRepository } from '../IStrategySiteRepository'
import { Site } from '~/modules/site/entities/Site'
import { StrategySite } from '../../entities/StrategySite'

export class StrategySiteRepository implements IStrategySiteRepository {
  async create(strategyId: string, siteId: string): Promise<boolean> {
    try {
      await prismaClient.strategySite.create({ data: { strategyId, siteId } })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
  async deleteManyByStrategyId(strategyId: string): Promise<boolean> {
    try {
      await prismaClient.strategySite.deleteMany({ where: { strategyId } })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
  async findManyByStrategyId(strategyId: string): Promise<StrategySite[] | null> {
    try {
      const strategySites = await prismaClient.strategySite.findMany({ where: { strategyId }, include: { site: true } })
      return strategySites.map(strategySite =>
        new StrategySite({
          ...strategySite,
          site: new Site(strategySite.site)
        })
      )
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
}