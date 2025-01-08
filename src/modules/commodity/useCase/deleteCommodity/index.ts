import { CommodityRepository } from '../../repositories/implementations/CommodityRepository'
import { DeleteCommodityController } from './DeleteCommodityController'
import { DeleteCommodityUseCase } from './DeleteCommodityUseCase'

const commodityRepository = new CommodityRepository()
const deleteCommodityUseCase = new DeleteCommodityUseCase(commodityRepository)
const deleteCommodityController = new DeleteCommodityController(deleteCommodityUseCase)

export { deleteCommodityController }