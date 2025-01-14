export class GroupUser {
  public readonly groupId: string
  public readonly userId: string

  constructor(data: Partial<GroupUser>) {
    Object.assign(this, data)
  }
}