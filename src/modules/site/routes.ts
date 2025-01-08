import { Router } from 'express'
import { createSiteController } from './useCase/createSite'

const router = Router()

router.post('/',
  (req, res) => createSiteController.handle(req, res)
)

export { router as siteRoutes }