export class Strategy {
  public readonly id: string
  public name: string
  public commodityId: string
  public userId: string

  constructor(data: Partial<Strategy>) {
    Object.assign(this, data)
  }
}