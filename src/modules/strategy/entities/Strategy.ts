import { Commodity } from '~/modules/commodity/entities/Commodity'

export class Strategy {
  public readonly id: string
  public name: string
  public commodityId: string
  public userId: string
  public Commodity: Commodity

  constructor(data: Partial<Strategy>) {
    Object.assign(this, data)
  }
}