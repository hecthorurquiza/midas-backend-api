import { StrategyRepository } from '../../repositories/implementations/StrategyRepository'
import { StrategySiteRepository } from '../../repositories/implementations/StrategySiteRepository'
import { StrategyTokenRepository } from '../../repositories/implementations/StrategyTokenRepository'
import { GetActivatedStrategyController } from './GetActivatedStrategyController'
import { GetActivatedStrategyUseCase } from './GetActivatedStrategyUseCase'

const strategyRepository = new StrategyRepository()
const strategySiteRepository = new StrategySiteRepository()
const strategyTokenRepository = new StrategyTokenRepository()

const getActivatedStrategyUseCase = new GetActivatedStrategyUseCase(strategyRepository, strategySiteRepository, strategyTokenRepository)
const getActivatedStrategyController = new GetActivatedStrategyController(getActivatedStrategyUseCase)

export { getActivatedStrategyController }