import { StrategyRepository } from '../../repositories/implementations/StrategyRepository'

export class DeleteStrategyUseCase {
  constructor(private readonly strategyRepository: StrategyRepository) {}

  async execute(strategyId: string): Promise<void> {
    const strategy = await this.strategyRepository.findOne({ id: strategyId })
    if (!strategy) throw new Error(`Estratégia de id = ${strategyId} não encontrada`)

    const deleted = await this.strategyRepository.delete(strategyId)
    if (!deleted) throw new Error('Erro ao deletar estratégia')
  }
}