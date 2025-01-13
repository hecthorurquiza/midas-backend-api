export interface IStrategySiteRepository {
  create(strategyId: string, siteId: string): Promise<boolean>
  deleteManyByStrategyId(strategyId: string): Promise<boolean>
}