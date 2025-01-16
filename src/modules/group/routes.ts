import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createGroupController } from './useCase/createGroup'
import { getUserGroupsController } from './useCase/getUserGroups'
import { updateGroupController } from './useCase/updateGroup'
import { deleteGroupController } from './useCase/deleteGroup'

const router = Router()

router.post('/', validateToken,
  (req, res) => createGroupController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserGroupsController.handle(req, res)
)

router.put('/:id', validateToken,
  (req, res) => updateGroupController.handle(req, res)
)

router.delete('/:id', validateToken,
  (req, res) => deleteGroupController.handle(req, res)
)

export { router as groupRoutes }