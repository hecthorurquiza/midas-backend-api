import { IUserRepository } from '~/modules/user/repositories/IUserRepository'
import { IStrategyRepository } from '../../repositories/IStrategyRepository'
import { IGetUserStrategiesResponseDTO } from './GetUserStrategiesDTO'
import { Strategy } from '../../entities/Strategy'

export class GetUserStrategiesUseCase {
  constructor(
    private readonly strategyRepository: IStrategyRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<IGetUserStrategiesResponseDTO> {
    const strategies = await this.validateData(userId)
    const strategiesMapped = this.mapStrategies(strategies)

    return { strategies: strategiesMapped }
  }

  private async validateData(userId: string) {
    const user = await this.userRepository.findOne({ id: userId })
    if (!user) throw new Error(`Usuário de id = ${userId} não encontrado`)

    const strategies = await this.strategyRepository.findManyByUserId(userId)
    if (!strategies) throw new Error('Erro ao buscar estratégias do usuário')

    return strategies
  }

  private mapStrategies(strategies: Strategy[]) {
    return strategies.map(strategy => ({
      id: strategy.id,
      name: strategy.name,
      commodity: strategy.commodity.name
    }))
  }
}