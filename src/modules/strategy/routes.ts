import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createStrategyController } from './useCase/createStrategy'
import { getUserStrategiesController } from './useCase/getUserStrategies'

const router = Router()

router.post('/', validateToken,
  (req, res) => createStrategyController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserStrategiesController.handle(req, res)
)

export { router as strategyRoutes }