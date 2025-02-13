import { StrategySite } from '../entities/StrategySite'

export interface IStrategySiteRepository {
  create(strategyId: string, siteId: string): Promise<boolean>
  deleteManyByStrategyId(strategyId: string): Promise<boolean>
  findManyByStrategyId(strategyId: string): Promise<StrategySite[] | null>
}