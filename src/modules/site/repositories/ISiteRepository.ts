import { Site } from '../entities/Site'

export interface IFindOneSite {
  id?: string
  name?: string
  urlAddress?: string
}

export interface ISiteRepository {
  create(data: Site): Promise<Site | null>
  findOne(data: IFindOneSite): Promise<Site | null>
}