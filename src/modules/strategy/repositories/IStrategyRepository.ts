import { Strategy } from '../entities/Strategy'

export interface IFindOneStrategy {
  id?: string
  name?: string
  commodityId?: string
  userId?: string
}

export interface IStrategyRepository {
  create(data: Strategy): Promise<Strategy | null>
  findOne(data: IFindOneStrategy): Promise<Strategy | null>
  findManyByUserId(userId: string): Promise<Strategy[] | null>
  update(data: Strategy): Promise<boolean>
  delete(id: string): Promise<boolean>
}