import { GroupUser } from '../entities/GroupUser'

export interface IGroupUserRepository {
  create(groupId: string, userId: string): Promise<boolean>
  findManyByUserId(userId: string): Promise<GroupUser[] | null>
}