import { CommodityRepository } from '~/modules/commodity/repositories/implementations/CommodityRepository'
import { StrategyRepository } from '../../repositories/implementations/StrategyRepository'
import { StrategySiteRepository } from '../../repositories/implementations/StrategySiteRepository'
import { StrategyTokenRepository } from '../../repositories/implementations/StrategyTokenRepository'
import { SiteRepository } from '~/modules/site/repositories/implementations/SiteRepository'
import { TokenRepository } from '~/modules/token/repositories/implementations/TokenRepository'
import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { CreateStrategyUseCase } from './CreateStrategyUseCase'
import { CreateStrategyController } from './CreateStrategyController'

const strategyRepository = new StrategyRepository()
const strategySiteRepository = new StrategySiteRepository()
const strategyTokenRepository = new StrategyTokenRepository()
const commodityRepository = new CommodityRepository()
const siteRepository = new SiteRepository()
const tokenRepository = new TokenRepository()
const userRepository = new UserRepository()

const createStrategyUseCase = new CreateStrategyUseCase(
  strategyRepository,
  strategySiteRepository,
  strategyTokenRepository,
  commodityRepository,
  siteRepository,
  tokenRepository,
  userRepository
)

const createStrategyController = new CreateStrategyController(createStrategyUseCase)

export { createStrategyController }