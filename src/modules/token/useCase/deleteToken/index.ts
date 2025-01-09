import { TokenRepository } from '../../repositories/implementations/TokenRepository'
import { DeleteTokenController } from './DeleteTokenController'
import { DeleteTokenUseCase } from './DeleteTokenUseCase'

const tokenRepository = new TokenRepository()
const deleteTokenUseCase = new DeleteTokenUseCase(tokenRepository)
const deleteTokenController = new DeleteTokenController(deleteTokenUseCase)

export { deleteTokenController }