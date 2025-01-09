import { Router, Response } from 'express'

import { authRoutes } from './modules/auth/routes'
import { commodityRoutes } from './modules/commodity/routes'
import { siteRoutes } from './modules/site/routes'
import { tokenRoutes } from './modules/token/routes'
import { userRoutes } from './modules/user/routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/commodity', commodityRoutes)
router.use('/site', siteRoutes)
router.use('/token', tokenRoutes)
router.use('/user', userRoutes)

router.get('/health', (_, res: Response) => {
  return res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  })
})

export { router }