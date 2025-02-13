import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createTokenController } from './useCase/createToken'
import { getUserTokensController } from './useCase/getUserTokens'
import { updateTokenController } from './useCase/updateToken'
import { deleteTokenController } from './useCase/deleteToken'
import { getTokenController } from './useCase/getToken'

const router = Router()

router.post('/', validateToken,
  (req, res) => createTokenController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserTokensController.handle(req, res)
)

router.get('/:id', validateToken,
  (req, res) => getTokenController.handle(req, res)
)

router.put('/:id', validateToken,
  (req, res) => updateTokenController.handle(req, res)
)

router.delete('/:id', validateToken,
  (req, res) => deleteTokenController.handle(req, res)
)

export { router as tokenRoutes }