import { Token } from '~/modules/token/entities/Token'

export class StrategyToken {
  public readonly strategyId: string
  public readonly token: Token
  public readonly tokenId: string

  constructor(data: Partial<StrategyToken>) {
    Object.assign(this, data)
  }
}