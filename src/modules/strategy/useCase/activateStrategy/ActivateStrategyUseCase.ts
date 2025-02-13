import { IStrategyRepository } from '../../repositories/IStrategyRepository'

export class ActivateStrategyUseCase {
  constructor(private readonly strategyRepository: IStrategyRepository) {}

  async execute(strategyId: string, userId: string): Promise<void> {
    const strategy = await this.strategyRepository.findOne({ id: strategyId })
    if (!strategy) throw new Error(`Estratégia com id = ${strategyId} não encontrada`)
    if (strategy.isActivated) throw new Error('Estratégia já ativada')
    if (strategy.userId !== userId) throw new Error('Usuário não autorizado')

    const activatedStrategy = await this.strategyRepository.findUserActivatedStrategy(userId)
    if (activatedStrategy) {
      const deactivated = await this.strategyRepository.updateStrategyStatus(activatedStrategy.id, false)
      if (!deactivated) throw new Error('Erro ao desativar estratégia')
    }

    const activated = await this.strategyRepository.updateStrategyStatus(strategyId, true)
    if (!activated) throw new Error('Erro ao ativar estratégia')
  }
}