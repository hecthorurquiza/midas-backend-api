import { prismaClient } from '~/utils/prismaClient'
import { IStrategyTokenRepository } from '../IStrategyTokenRepository'
import { StrategyToken } from '../../entities/StrategyToken'
import { Token } from '~/modules/token/entities/Token'

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
  async deleteManyByStrategyId(strategyId: string): Promise<boolean> {
    try {
      await prismaClient.strategyToken.deleteMany({ where: { strategyId } })
      return true
    }
    catch (error: any) {
      console.error(error.message)
      return false
    }
  }
  async findManyByStrategyId(strategyId: string): Promise<StrategyToken[] | null> {
    try {
      const strategyTokens = await prismaClient.strategyToken.findMany({ where: { strategyId }, include: { token: true } })
      return strategyTokens.map(strategyToken =>
        new StrategyToken({
          ...strategyToken,
          token: new Token(strategyToken.token)
        })
      )
    }
    catch (error: any) {
      console.error(error.message)
      return null
    }
  }
}