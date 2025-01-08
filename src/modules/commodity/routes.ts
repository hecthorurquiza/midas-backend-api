import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createCommodityController } from './useCase/createCommodity'
import { getUserCommoditysController } from './useCase/getUserCommodities'

const router = Router()

router.post('/', validateToken,
  (req, res) => createCommodityController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserCommoditysController.handle(req, res)
)

export { router as commodityRoutes }