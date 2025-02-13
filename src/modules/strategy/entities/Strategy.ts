import { Commodity } from '~/modules/commodity/entities/Commodity'

export class Strategy {
  public readonly id: string
  public name: string
  public commodity: Commodity
  public commodityId: string
  public userId: string

  constructor(data: Partial<Strategy>) {
    Object.assign(this, data)
  }

  update(name: string, commodityId: string) {
    this.name = name
    this.commodityId = commodityId
  }
}