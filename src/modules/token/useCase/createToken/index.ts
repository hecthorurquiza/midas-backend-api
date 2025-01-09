import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { TokenRepository } from '../../repositories/implementations/TokenRepository'
import { CreateTokenUseCase } from './CreateTokenUseCase'
import { CreateTokenController } from './CreateTokenController'

const tokenRepository = new TokenRepository()
const userRepository = new UserRepository()
const createTokenUseCase = new CreateTokenUseCase(tokenRepository, userRepository)
const createTokenController = new CreateTokenController(createTokenUseCase)

export { createTokenController }