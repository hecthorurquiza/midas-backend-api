import { ICommodityRepository } from '~/modules/commodity/repositories/ICommodityRepository'
import { IStrategyRepository } from '../../repositories/IStrategyRepository'
import { IStrategySiteRepository } from '../../repositories/IStrategySiteRepository'
import { IStrategyTokenRepository } from '../../repositories/IStrategyTokenRepository'
import { ISiteRepository } from '~/modules/site/repositories/ISiteRepository'
import { ITokenRepository } from '~/modules/token/repositories/ITokenRepository'
import { IUpdateStrategyRequestDTO, IUpdateStrategyResponseDTO } from './UpdateStrategyDTO'
import { Strategy } from '../../entities/Strategy'

export class UpdateStrategyUseCase {
  constructor(
    private readonly strategyRepository: IStrategyRepository,
    private readonly strategySiteRepository: IStrategySiteRepository,
    private readonly strategyTokenRepository: IStrategyTokenRepository,
    private readonly commodityRepository: ICommodityRepository,
    private readonly siteRepository: ISiteRepository,
    private readonly tokenRepository: ITokenRepository
  ) {}

  async execute(strategyId: string, data: IUpdateStrategyRequestDTO): Promise<IUpdateStrategyResponseDTO> {
    const { strategy } = await this.validateData(strategyId, data)
    await this.updateStrategy(strategy, data)
    await this.deleteOldData(strategyId)
    await this.createNewRalationShips(strategyId, data)

    return {
      id: strategy.id,
      name: strategy.name,
      commodity_id: strategy.commodityId,
    }
  }

  private async validateData(strategyId: string, data: IUpdateStrategyRequestDTO) {
    const [strategy, nameAlreadyExists, commodityAlreadyExists, commodity] = await Promise.all([
      this.strategyRepository.findOne({ id: strategyId }),
      this.strategyRepository.findOne({ name: data.name }),
      this.strategyRepository.findOne({ commodityId: data.commodity_id }),
      this.commodityRepository.findOne({ id: data.commodity_id })
    ])

    if (!strategy) throw new Error(`Estratégia de id = ${strategyId} não encontrada`)
    if (nameAlreadyExists && nameAlreadyExists.id !== strategyId) throw new Error('Nome já registrado')
    if (commodityAlreadyExists && commodityAlreadyExists.id !== strategyId) throw new Error('Commodity já registrado')
    if (!commodity) throw new Error(`Commodity de id = ${data.commodity_id} não encontrado`)

    await Promise.all([
      Promise.all(
        data.sites_ids.map(async (siteId) => {
          const site = await this.siteRepository.findOne({ id: siteId })
          if (!site) throw new Error(`Site de id = ${siteId} não encontrado`)
        })
      ),
      Promise.all(
        data.tokens_ids.map(async (tokenId) => {
          const token = await this.tokenRepository.findOne({ id: tokenId })
          if (!token) throw new Error(`Token de id = ${tokenId} não encontrado`)
        })
      )
    ])

    return { strategy }
  }

  private async updateStrategy(strategy: Strategy, data: IUpdateStrategyRequestDTO) {
    strategy.update(data.name, data.commodity_id)
    const updated = await this.strategyRepository.update(strategy)
    if (!updated) throw new Error('Erro ao atualizar estratégia')
  }

  private async deleteOldData(strategyId: string) {
    const [deletedSites, deletedToken] = await Promise.all([
      this.strategySiteRepository.deleteManyByStrategyId(strategyId),
      this.strategyTokenRepository.deleteManyByStrategyId(strategyId)
    ])

    if (!deletedSites) throw new Error('Erro ao deletar relação entre estratégia e site')
    if (!deletedToken) throw new Error('Erro ao deletar relação entre estratégia e token')
  }

  private async createNewRalationShips(strategyId: string, data: IUpdateStrategyRequestDTO) {
    await Promise.all([
      Promise.all(
        data.sites_ids.map(async (siteId) => {
          const created = await this.strategySiteRepository.create(strategyId, siteId)
          if (!created) throw new Error('Erro ao criar relação entre estratégia e site')
        })
      ),
      Promise.all(
        data.tokens_ids.map(async (tokenId) => {
          const created = await this.strategyTokenRepository.create(strategyId, tokenId)
          if (!created) throw new Error('Erro ao criar relação entre estratégia e token')
        })
      )
    ])
  }
}