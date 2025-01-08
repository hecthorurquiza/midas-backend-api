import { Router } from 'express'
import { createCommodityController } from './useCase/createCommodity'
import { validateToken } from '~/middlewares/validateToken'

const router = Router()

router.post('/', validateToken,
  (req, res) => createCommodityController.handle(req, res)
)

export { router as commodityRoutes }