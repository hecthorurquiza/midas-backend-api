import { TokenRepository } from '../../repositories/implementations/TokenRepository'
import { GetTokenController } from './GetTokenController'
import { GetTokenUseCase } from './GetTokenUseCase'

const tokenRepository = new TokenRepository()
const getTokenUseCase = new GetTokenUseCase(tokenRepository)
const getTokenController = new GetTokenController(getTokenUseCase)

export { getTokenController }