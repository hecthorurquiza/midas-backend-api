import { Request, Response } from 'express'
import { DeleteCommodityUseCase } from './DeleteCommodityUseCase'

export class DeleteCommodityController {
  constructor(private readonly deleteCommodityUseCase: DeleteCommodityUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await this.deleteCommodityUseCase.execute(id)
      return res.status(204).send()
    }
    catch (error: any) {
      if (error.message.includes('não encontrado')) return res.status(404).json({ message: error.message })
      return res.status(500).json({ message: error.message })
    }

  }
}