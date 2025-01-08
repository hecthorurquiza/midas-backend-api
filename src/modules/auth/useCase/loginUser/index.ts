import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { LoginUserUseCase } from './LoginUserUseCase'
import { LoginUserController } from './LoginUserController'

const userRepository = new UserRepository()
const loginUserUseCase = new LoginUserUseCase(userRepository)
const loginUserController = new LoginUserController(loginUserUseCase)

export { loginUserController }