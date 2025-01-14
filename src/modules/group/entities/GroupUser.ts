import { Group } from './Group'

export class GroupUser {
  public readonly groupId: string
  public readonly userId: string
  public readonly group: Group

  constructor(data: Partial<GroupUser>) {
    Object.assign(this, data)
  }
}