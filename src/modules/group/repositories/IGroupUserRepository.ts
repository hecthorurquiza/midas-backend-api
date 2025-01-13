export interface IGroupUserRepository {
  create(groupId: string, userId: string): Promise<boolean>
}