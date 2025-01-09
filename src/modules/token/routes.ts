import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createTokenController } from './useCase/createToken'

const router = Router()

router.post('/', validateToken,
  (req, res) => createTokenController.handle(req, res)
)

export { router as tokenRoutes }