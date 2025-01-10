export interface IStrategySiteRepository {
  create(strategyId: string, siteId: string): Promise<boolean>
}