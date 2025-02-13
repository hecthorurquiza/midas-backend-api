import { StrategyRepository } from '../../repositories/implementations/StrategyRepository'
import { ActivateStrategyController } from './ActivateStrategyController'
import { ActivateStrategyUseCase } from './ActivateStrategyUseCase'

const strategyRepository = new StrategyRepository()
const activateStrategyUseCase = new ActivateStrategyUseCase(strategyRepository)
const activateStrategyController = new ActivateStrategyController(activateStrategyUseCase)

export { activateStrategyController }