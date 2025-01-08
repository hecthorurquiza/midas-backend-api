export class Site {
  public readonly id: string
  public name: string
  public urlAddress: string
  public userId: string

  constructor(data: Partial<Site>) {
    Object.assign(this, data)
  }
}