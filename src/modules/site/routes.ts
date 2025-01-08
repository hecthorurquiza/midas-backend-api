import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createSiteController } from './useCase/createSite'
import { getUserSitesController } from './useCase/getUserSites'

const router = Router()

router.post('/', validateToken,
  (req, res) => createSiteController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserSitesController.handle(req, res)
)

export { router as siteRoutes }