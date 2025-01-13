import { prismaClient } from '~/utils/prismaClient'
import { Strategy } from '../../entities/Strategy'
import { IFindOneStrategy, IStrategyRepository } from '../IStrategyRepository'

export class StrategyRepository implements IStrategyRepository {
  async create(data: Strategy): Promise<Strategy | null> {
    try {
      const strategy = await prismaClient.strategy.create({ data })
      return new Strategy(strategy)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findOne(data: IFindOneStrategy): Promise<Strategy | null> {
    try {
      const strategy = await prismaClient.strategy.findFirst({
        where: {
          OR: [
            { id: data.id },
            { name: data.name },
            { commodityId: data.commodityId },
          ]
        }
      })

      if (!strategy) return null
      return new Strategy(strategy)
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async findManyByUserId(userId: string): Promise<Strategy[] | null> {
    try {
      const strategies = await prismaClient.strategy.findMany({
        where: { userId },
        include: { Commodity: true }
      })
      return strategies.map(strategy => new Strategy(strategy))
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
  async update(data: Strategy): Promise<boolean> {
    try {
      await prismaClient.strategy.update({
        where: { id: data.id },
        data: {
          name: data.name,
          commodityId: data.commodityId
        }
      })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
}