import { TokenRepository } from '../../repositories/implementations/TokenRepository'
import { UpdateTokenController } from './UpdateTokenController'
import { UpdateTokenUseCase } from './UpdateTokenUseCase'

const tokenRepository = new TokenRepository()
const updateTokenUseCase = new UpdateTokenUseCase(tokenRepository)
const updateTokenController = new UpdateTokenController(updateTokenUseCase)

export { updateTokenController }