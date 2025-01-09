import { Request, Response } from 'express'
import { UpdateSiteUseCase } from './UpdateSiteUseCase'
import { IUpdateSiteRequestDTO } from './UpdateSiteDTO'
import { badRequest, conflict, internalServerError, notFound, ok } from '~/utils/httpResponse'
import { validateUrl } from '~/utils/validateUrl'

export class UpdateSiteController {
  constructor(private readonly updateSiteUseCase: UpdateSiteUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const bodyReq = req.body as IUpdateSiteRequestDTO

    if (!bodyReq.name) return badRequest(res, 'Nome é obrigatório')
    if (!bodyReq.url_address) return badRequest(res, 'URL é obrigatória')

    const isValidUrl = validateUrl(bodyReq.url_address)
    if (!isValidUrl) return badRequest(res, 'URL inválida')

    try {
      const site = await this.updateSiteUseCase.execute(id, {
        ...bodyReq,
        name: bodyReq.name.toUpperCase()
      })
      return ok(res, site)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrad')) return conflict(res, error.message)
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}