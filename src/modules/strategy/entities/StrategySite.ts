import { Site } from '~/modules/site/entities/Site'

export class StrategySite {
  public readonly strategyId: string
  public readonly site: Site
  public readonly siteId: string

  constructor(data: Partial<StrategySite>) {
    Object.assign(this, data)
  }
}