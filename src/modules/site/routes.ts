import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createSiteController } from './useCase/createSite'
import { getUserSitesController } from './useCase/getUserSites'
import { updateSiteController } from './useCase/updateSite'

const router = Router()

router.post('/', validateToken,
  (req, res) => createSiteController.handle(req, res)
)

router.get('/', validateToken,
  (req, res) => getUserSitesController.handle(req, res)
)

router.put('/:id', validateToken,
  (req, res) => updateSiteController.handle(req, res)
)

export { router as siteRoutes }