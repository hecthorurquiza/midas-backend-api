export class StrategyToken {
  public readonly strategyId: string
  public readonly tokenId: string

  constructor(data: Partial<StrategyToken>) {
    Object.assign(this, data)
  }
}