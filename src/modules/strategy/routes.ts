import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createStrategyController } from './useCase/createStrategy'
import { getUserStrategiesController } from './useCase/getUserStrategies'
import { updateStrategyController } from './useCase/updateStrategy'

const router = Router()

router.post('/', validateToken,
  (req, res) => createStrategyController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserStrategiesController.handle(req, res)
)

router.put('/:id', validateToken,
  (req, res) => updateStrategyController.handle(req, res)
)

export { router as strategyRoutes }