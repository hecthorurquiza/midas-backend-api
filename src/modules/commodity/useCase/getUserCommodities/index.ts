import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { CommodityRepository } from '../../repositories/implementations/CommodityRepository'
import { GetUserCommoditiesUseCase } from './GetUserCommoditiesUseCase'
import { GetUserCommoditiesController } from './GetUserCommoditiesController'

const commodityRepository = new CommodityRepository()
const userRepository = new UserRepository()
const getUserCommoditiesUseCase = new GetUserCommoditiesUseCase(commodityRepository, userRepository)
const getUserCommoditysController = new GetUserCommoditiesController(getUserCommoditiesUseCase)

export { getUserCommoditysController }