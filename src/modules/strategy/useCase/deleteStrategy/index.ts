import { StrategyRepository } from '../../repositories/implementations/StrategyRepository'
import { DeleteStrategyController } from './DeleteStrategyControlle'
import { DeleteStrategyUseCase } from './DeleteStrategyUseCase'

const strategyRepository = new StrategyRepository()
const deleteStrategyUseCase = new DeleteStrategyUseCase(strategyRepository)
const deleteStrategyController = new DeleteStrategyController(deleteStrategyUseCase)

export { deleteStrategyController }