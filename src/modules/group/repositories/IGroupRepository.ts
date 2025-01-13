import { Group } from '../entities/Group'

export interface IFindOneGroup {
  id?: string
  name?: string
  userId?: string
}

export interface IGroupRepository {
  create(data: Group): Promise<Group | null>;
  findOne(data: IFindOneGroup): Promise<Group | null>;
}