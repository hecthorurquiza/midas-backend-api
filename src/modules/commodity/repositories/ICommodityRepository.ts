import { Commodity } from '../entities/Commodity'

export interface IFindOneCommodity {
  id?: string
  code?: string
}

export interface ICommodityRepository {
  create(data: Commodity): Promise<Commodity | null>
  findOne(data: IFindOneCommodity): Promise<Commodity | null>
}