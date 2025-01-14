import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createGroupController } from './useCase/createGroup'
import { getUserGroupsController } from './useCase/getUserGroups'

const router = Router()

router.post('/', validateToken,
  (req, res) => createGroupController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserGroupsController.handle(req, res)
)

export { router as groupRoutes }