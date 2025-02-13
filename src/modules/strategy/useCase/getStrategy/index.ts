import { StrategyRepository } from '../../repositories/implementations/StrategyRepository'
import { StrategySiteRepository } from '../../repositories/implementations/StrategySiteRepository'
import { StrategyTokenRepository } from '../../repositories/implementations/StrategyTokenRepository'
import { GetStrategyController } from './GetStrategyController'
import { GetStrategyUseCase } from './GetStrategyUseCase'

const strategyRepository = new StrategyRepository()
const strategySiteRepository = new StrategySiteRepository()
const strategyTokenRepository = new StrategyTokenRepository()

const getStrategyUseCase = new GetStrategyUseCase(strategyRepository, strategySiteRepository, strategyTokenRepository)
const getStrategyController = new GetStrategyController(getStrategyUseCase)

export { getStrategyController }