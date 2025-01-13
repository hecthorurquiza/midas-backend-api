import { Site } from '../entities/Site'

export interface IFindOneSite {
  id?: string
  name?: string
  urlAddress?: string
  userId?: string
}

export interface ISiteRepository {
  create(data: Site): Promise<Site | null>
  findOne(data: IFindOneSite): Promise<Site | null>
  findManyByUserId(userId: string): Promise<Site[] | null>
  update(data: Site): Promise<boolean>
  delete(id: string): Promise<boolean>
}