import { CommodityRepository } from '../../repositories/implementations/CommodityRepository'
import { UpdateCommodityController } from './UpdateCommodityController'
import { UpdateCommodityUseCase } from './UpdateCommodityUseCase'

const commodityRepository = new CommodityRepository()
const updateCommodityUseCase = new UpdateCommodityUseCase(commodityRepository)
const updateCommodityController = new UpdateCommodityController(updateCommodityUseCase)

export { updateCommodityController }