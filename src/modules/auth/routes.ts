import { Router } from 'express'
import { loginUserController } from './useCase/loginUser'

const router = Router()

router.post('/login',
  (req, res) => loginUserController.handle(req, res)
)

export { router as authRoutes }