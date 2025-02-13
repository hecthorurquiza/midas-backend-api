import { IStrategyRepository } from '../../repositories/IStrategyRepository'
import { IStrategySiteRepository } from '../../repositories/IStrategySiteRepository'
import { IStrategyTokenRepository } from '../../repositories/IStrategyTokenRepository'
import { IGetStrategyResponseDTO } from './GetStrategyDTO'

export class GetStrategyUseCase {
  constructor(
    private strategyRepository: IStrategyRepository,
    private strategySiteRepository: IStrategySiteRepository,
    private strategyTokenRepository: IStrategyTokenRepository
  ) {}

  async execute(strategyId: string): Promise<IGetStrategyResponseDTO | null> {
    const strategy = await this.strategyRepository.findOne({ id: strategyId })
    if (!strategy) throw new Error(`Estratégia de id = ${strategyId} não encontrada`)

    const [strategySites, strategyTokens] = await Promise.all([
      this.strategySiteRepository.findManyByStrategyId(strategyId),
      this.strategyTokenRepository.findManyByStrategyId(strategyId)
    ])
    if (!strategySites) throw new Error(`Sites da estratégia de id = ${strategyId} não encontrados`)
    if (!strategyTokens) throw new Error(`Tokens da estratégia de id = ${strategyId} não encontrados`)

    return {
      id: strategy.id,
      name: strategy.name,
      commodity_id: strategy.commodityId,
      sites: strategySites.map(strategySite => ({
        id: strategySite.site.id,
        name: strategySite.site.name,
        url: strategySite.site.urlAddress
      })),
      tokens: strategyTokens.map(strategyToken => ({
        id: strategyToken.token.id,
        token: strategyToken.token.token
      }))
    }
  }
}