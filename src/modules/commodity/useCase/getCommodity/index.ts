import { CommodityRepository } from '../../repositories/implementations/CommodityRepository'
import { GetCommodityController } from './GetCommodityController'
import { GetCommodityUseCase } from './GetCommodityUseCase'

const commodityRepository = new CommodityRepository()
const getCommodityUseCase = new GetCommodityUseCase(commodityRepository)
const getCommodityController = new GetCommodityController(getCommodityUseCase)

export { getCommodityController }