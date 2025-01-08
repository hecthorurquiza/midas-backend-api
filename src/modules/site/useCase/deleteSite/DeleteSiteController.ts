import { Request, Response } from 'express'
import { DeleteSiteUseCase } from './DeleteSiteUseCase'

export class DeleteSiteController {
  constructor(private readonly deleteSiteUseCase: DeleteSiteUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await this.deleteSiteUseCase.execute(id)
      return res.status(204).send()
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return res.status(404).json({ error: error.message })
      return res.status(500).json({ error: error.message })
    }
  }
}