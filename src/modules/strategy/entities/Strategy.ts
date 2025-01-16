import { Commodity } from '~/modules/commodity/entities/Commodity'

export class Strategy {
  public readonly id: string
  public name: string
  public commodityId: string
  public userId: string
  public commodity: Commodity

  constructor(data: Partial<Strategy>) {
    Object.assign(this, data)
  }

  update(name: string, commodityId: string) {
    this.name = name
    this.commodityId = commodityId
  }
}