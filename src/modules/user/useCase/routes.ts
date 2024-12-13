import { Router } from 'express'
import { createUserController } from './createUser'

const router = Router()

router.post('/',
  (req, res) => createUserController.handle(req, res)
)

export { router as userRoutes }