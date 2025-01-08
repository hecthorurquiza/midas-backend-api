import { Commodity } from '../entities/Commodity'

export interface IFindOneCommodity {
  id?: string
  name?: string
  code?: string
}

export interface ICommodityRepository {
  create(data: Commodity): Promise<Commodity | null>
  findOne(data: IFindOneCommodity): Promise<Commodity | null>
  findManyByUserId(userId: string): Promise<Commodity[] | null>
  update(data: Commodity): Promise<boolean>
  delete(id: string): Promise<boolean>
}