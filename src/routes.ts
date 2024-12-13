import { Router, Response } from 'express'

import { userRoutes } from './modules/user/useCase/routes'

const router = Router()

router.use('/user', userRoutes)

router.get('/health', (_, res: Response) => {
  return res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  })
})

export { router }