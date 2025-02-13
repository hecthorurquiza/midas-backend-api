import { StrategyToken } from '../entities/StrategyToken'

export interface IStrategyTokenRepository {
  create(strategyId: string, tokenId: string): Promise<boolean>
  deleteManyByStrategyId(strategyId: string): Promise<boolean>
  findManyByStrategyId(strategyId: string): Promise<StrategyToken[] | null>
}