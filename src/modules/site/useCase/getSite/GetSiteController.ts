import { Request, Response } from 'express'
import { GetSiteUseCase } from './GetSiteUseCase'
import { notFound, ok } from '~/utils/httpResponse'

export class GetSiteController {
  constructor(private readonly getSiteUseCase: GetSiteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    try {
      const site = await this.getSiteUseCase.execute(id)
      return ok(response, site)
    }
    catch (error: any) {
      return notFound(response, error.message)
    }
  }
}