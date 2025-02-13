import { IStrategyRepository } from '../../repositories/IStrategyRepository'
import { IStrategySiteRepository } from '../../repositories/IStrategySiteRepository'
import { IStrategyTokenRepository } from '../../repositories/IStrategyTokenRepository'
import { IGetActivatedStrategyResponseDTO } from './GetActivatedStrategyDTO'

export class GetActivatedStrategyUseCase {
  constructor(
    private readonly strategyRepository: IStrategyRepository,
    private readonly strategySiteRepository: IStrategySiteRepository,
    private readonly strategyTokenRepository: IStrategyTokenRepository
  ) {}

  async execute(userId: string): Promise<IGetActivatedStrategyResponseDTO> {
    const strategy = await this.strategyRepository.findUserActivatedStrategy(userId)
    if (!strategy) throw new Error('Nenhuma estratégia ativa encontrada para o usuário')

    const [strategySites, strategyTokens] = await Promise.all([
      this.strategySiteRepository.findManyByStrategyId(strategy.id),
      this.strategyTokenRepository.findManyByStrategyId(strategy.id)
    ])
    if (!strategySites) throw new Error(`Sites da estratégia de id = ${strategy.id} não encontrados`)
    if (!strategyTokens) throw new Error(`Tokens da estratégia de id = ${strategy.id} não encontrados`)

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