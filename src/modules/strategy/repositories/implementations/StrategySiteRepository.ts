import { prismaClient } from '~/utils/prismaClient'
import { IStrategySiteRepository } from '../IStrategySiteRepository'

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
}