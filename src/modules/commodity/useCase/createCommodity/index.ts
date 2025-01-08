import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { CommodityRepository } from '../../repositories/implementations/CommodityRepository'
import { CreateCommodityController } from './CreateCommodityController'
import { CreateCommodityUseCase } from './CreateCommodityUseCase'

const commodityRepository = new CommodityRepository()
const userRepository = new UserRepository()
const createCommodityUseCase = new CreateCommodityUseCase(commodityRepository, userRepository)
const createCommodityController = new CreateCommodityController(createCommodityUseCase)

export { createCommodityController }