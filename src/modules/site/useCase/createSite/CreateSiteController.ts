import { Request, Response } from 'express'
import { CreateSiteUseCase } from './CreateSiteUseCase'
import { ICreateSiteRequestDTO } from './CreateSiteDTO'
import { badRequest, conflict, created, internalServerError, notFound } from '~/utils/httpResponse'
import { validateUrl } from '~/utils/validateUrl'

export class CreateSiteController {
  constructor(private readonly createSiteUseCase: CreateSiteUseCase) {}

  async handle(req: Request, res: Response) {
    const bodyReq = req.body as ICreateSiteRequestDTO

    if (!bodyReq.name) return badRequest(res, 'Nome é obrigatório')
    if (!bodyReq.url_address) return badRequest(res, 'URL é obrigatória')

    const isValidUrl = validateUrl(bodyReq.url_address)
    if (!isValidUrl) return badRequest(res, 'URL inválida')

    try {
      const site = await this.createSiteUseCase.execute({
        ...bodyReq,
        name: bodyReq.name.toUpperCase(),
      })
      return created(res, site)
    }
    catch (error: any) {
      if (error.message.includes('já cadastrad')) return conflict(res, error.message)
      if (error.message.includes('não encontrado')) return notFound(res, error.message)
      return internalServerError(res, error.message)
    }
  }
}