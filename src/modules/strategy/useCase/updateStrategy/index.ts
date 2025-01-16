import { CommodityRepository } from '~/modules/commodity/repositories/implementations/CommodityRepository'
import { StrategyRepository } from '../../repositories/implementations/StrategyRepository'
import { StrategySiteRepository } from '../../repositories/implementations/StrategySiteRepository'
import { StrategyTokenRepository } from '../../repositories/implementations/StrategyTokenRepository'
import { SiteRepository } from '~/modules/site/repositories/implementations/SiteRepository'
import { TokenRepository } from '~/modules/token/repositories/implementations/TokenRepository'
import { UpdateStrategyUseCase } from './UpdateStrategyUseCase'
import { UpdateStrategyController } from './UpdateStrategyController'

const strategyRepository = new StrategyRepository()
const strategySiteRepository = new StrategySiteRepository()
const strategyTokenRepository = new StrategyTokenRepository()
const commodityRepository = new CommodityRepository()
const siteRepository = new SiteRepository()
const tokenRepository = new TokenRepository()

const updateStrategyUseCase = new UpdateStrategyUseCase(
  strategyRepository,
  strategySiteRepository,
  strategyTokenRepository,
  commodityRepository,
  siteRepository,
  tokenRepository
)

const updateStrategyController = new UpdateStrategyController(updateStrategyUseCase)

export { updateStrategyController }