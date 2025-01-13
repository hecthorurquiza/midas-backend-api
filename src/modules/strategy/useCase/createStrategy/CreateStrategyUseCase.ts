import { ICommodityRepository } from '~/modules/commodity/repositories/ICommodityRepository'
import { IStrategyRepository } from '../../repositories/IStrategyRepository'
import { ISiteRepository } from '~/modules/site/repositories/ISiteRepository'
import { ITokenRepository } from '~/modules/token/repositories/ITokenRepository'
import { IStrategySiteRepository } from '../../repositories/IStrategySiteRepository'
import { IStrategyTokenRepository } from '../../repositories/IStrategyTokenRepository'
import { ICreateStrategyRequestDTO, ICreateStrategyResponseDTO } from './CreateStrategyDTO'
import { Strategy } from '../../entities/Strategy'
import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { Site } from '~/modules/site/entities/Site'
import { Token } from '~/modules/token/entities/Token'

export class CreateStrategyUseCase {
  constructor(
    private readonly strategyRepository: IStrategyRepository,
    private readonly strategySiteRepository: IStrategySiteRepository,
    private readonly strategyTokenRepository: IStrategyTokenRepository,
    private readonly commodityRepository: ICommodityRepository,
    private readonly siteRepository: ISiteRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: ICreateStrategyRequestDTO): Promise<ICreateStrategyResponseDTO> {
    const { sites, tokens } = await this.validateData(data)
    const strategy = await this.createStrategy(data)
    await this.createRelationships(strategy, sites, tokens)

    return {
      id: strategy.id,
      name: strategy.name,
      commodity_id: strategy.commodityId,
    }
  }

  private async validateData(data: ICreateStrategyRequestDTO) {
    const [commodity, user, nameAlreadyExist, commodityAlreadyExist] = await Promise.all([
      this.commodityRepository.findOne({ id: data.commodity_id }),
      this.userRepository.findOne({ id: data.user_id }),
      this.strategyRepository.findOne({ name: data.name, userId: data.user_id }),
      this.strategyRepository.findOne({ commodityId: data.commodity_id, userId: data.user_id }),
    ])

    if (!commodity) throw new Error(`Commodity de id = ${data.commodity_id} não encontrado`)
    if (!user) throw new Error(`Usuário de id = ${data.user_id} não encontrado`)
    if (nameAlreadyExist) throw new Error('Nome já registrado')
    if (commodityAlreadyExist) throw new Error('Commodity já registrado')

    const [sites, tokens] = await Promise.all([
      Promise.all(
        data.sites_ids.map(async (siteId) => {
          const site = await this.siteRepository.findOne({ id: siteId })
          if (!site) throw new Error(`Site de id = ${siteId} não encontrado`)
          return site
        })
      ),
      Promise.all(
        data.tokens_ids.map(async (tokenId) => {
          const token = await this.tokenRepository.findOne({ id: tokenId })
          if (!token) throw new Error(`Token de id = ${tokenId} não encontrado`)
          return token
        })
      )
    ])

    return { commodity, user, sites, tokens }
  }

  private async createStrategy(data: ICreateStrategyRequestDTO) {
    const strategy = await this.strategyRepository.create(
      new Strategy({
        name: data.name,
        commodityId: data.commodity_id,
        userId: data.user_id
      })
    )
    if (!strategy) throw new Error('Erro ao criar estratégia')
    return strategy
  }

  private async createRelationships(strategy: Strategy, sites: Site[], tokens: Token[]) {
    await Promise.all([
      Promise.all(
        sites.map(async (site) => {
          const created = await this.strategySiteRepository.create(strategy.id, site.id)
          if (!created) throw new Error('Erro ao criar estratégia')
        })
      ),
      Promise.all(
        tokens.map(async (token) => {
          const created = await this.strategyTokenRepository.create(strategy.id, token.id)
          if (!created) throw new Error('Erro ao criar estratégia')
        })
      )
    ])
  }
}