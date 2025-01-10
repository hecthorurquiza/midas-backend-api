export interface IStrategyTokenRepository {
  create(strategyId: string, tokenId: string): Promise<boolean>
}