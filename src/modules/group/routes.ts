import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createGroupController } from './useCase/createGroup'

const router = Router()

router.post('/', validateToken,
  (req, res) => createGroupController.handle(req, res)
)

export { router as groupRoutes }