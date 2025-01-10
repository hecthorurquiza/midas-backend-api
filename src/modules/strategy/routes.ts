import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createStrategyController } from './useCase/createStrategy'

const router = Router()

router.post('/', validateToken,
  (req, res) => createStrategyController.handle(req, res)
)

export { router as strategyRoutes }