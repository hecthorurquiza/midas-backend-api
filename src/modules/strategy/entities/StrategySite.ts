export class StrategySite {
  public readonly strategyId: string
  public readonly siteId: string

  constructor(data: Partial<StrategySite>) {
    Object.assign(this, data)
  }
}