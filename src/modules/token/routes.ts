import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createTokenController } from './useCase/createToken'
import { getUserTokensController } from './useCase/getUserTokens'

const router = Router()

router.post('/', validateToken,
  (req, res) => createTokenController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserTokensController.handle(req, res)
)

export { router as tokenRoutes }