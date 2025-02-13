import { Request, Response } from 'express'
import { GetTokenUseCase } from './GetTokenUseCase'
import { notFound, ok } from '~/utils/httpResponse'

export class GetTokenController {
  constructor(private readonly getTokenUseCase: GetTokenUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    try {
      const token = await this.getTokenUseCase.execute(id)
      return ok(response, token)
    }
    catch (error: any) {
      return notFound(response, error.message)
    }
  }
}