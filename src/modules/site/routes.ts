import { Router } from 'express'
import { validateToken } from '~/middlewares/validateToken'
import { createSiteController } from './useCase/createSite'
import { getUserSitesController } from './useCase/getUserSites'
import { updateSiteController } from './useCase/updateSite'
import { deleteSiteController } from './useCase/deleteSite'

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

router.delete('/:id', validateToken,
  (req, res) => deleteSiteController.handle(req, res)
)

export { router as siteRoutes }