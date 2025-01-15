import { Router } from 'express'
import { loginUserController } from './useCase/loginUser'
import { forgotPasswordController } from './useCase/forgotPassword'
import { validateRecoverCodeController } from './useCase/validateRecoverCode'

const router = Router()

router.post('/login',
  (req, res) => loginUserController.handle(req, res)
)

router.post('/forgot-password',
  (req, res) => forgotPasswordController.handle(req, res)
)

router.post('/validate-code',
  (req, res) => validateRecoverCodeController.handle(req, res)
)

export { router as authRoutes }