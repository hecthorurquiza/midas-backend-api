export class Group {
  public readonly id: string
  public name: string
  public userId: string

  constructor(data: Partial<Group>) {
    Object.assign(this, data)
  }
}