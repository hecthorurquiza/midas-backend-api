import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { TokenRepository } from '../../repositories/implementations/TokenRepository'
import { GetUserTokensUseCase } from './GetUserTokensUseCase'
import { GetUserTokensController } from './GetUserTokensController'

const tokenRepository = new TokenRepository()
const userRepository = new UserRepository()
const getUserTokensUseCase = new GetUserTokensUseCase(tokenRepository, userRepository)
const getUserTokensController = new GetUserTokensController(getUserTokensUseCase)

export { getUserTokensController }