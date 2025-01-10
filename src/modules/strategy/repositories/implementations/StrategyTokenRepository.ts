import { prismaClient } from '~/utils/prismaClient'
import { IStrategyTokenRepository } from '../IStrategyTokenRepository'

export class StrategyTokenRepository implements IStrategyTokenRepository {
  async create(strategyId: string, tokenId: string): Promise<boolean> {
    try {
      await prismaClient.strategyToken.create({ data: { strategyId, tokenId } })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
}