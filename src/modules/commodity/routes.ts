import { Router } from 'express'
import { createCommodityController } from './useCase/createCommodity'

const router = Router()

router.post('/',
  (req, res) => createCommodityController.handle(req, res)
)

export { router as commodityRoutes }