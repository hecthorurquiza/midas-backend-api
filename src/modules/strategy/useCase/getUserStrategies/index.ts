import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { StrategyRepository } from '../../repositories/implementations/StrategyRepository'
import { GetUserStrategiesUseCase } from './GetUserStrategiesUseCase'
import { GetUserStrategiesController } from './GetUserStrategiesController'

const strategyRepository = new StrategyRepository()
const userRepository = new UserRepository()
const getUserStrategiesUseCase = new GetUserStrategiesUseCase(strategyRepository, userRepository)
const getUserStrategiesController = new GetUserStrategiesController(getUserStrategiesUseCase)

export { getUserStrategiesController }