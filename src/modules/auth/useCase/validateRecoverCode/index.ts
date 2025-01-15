import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { ValidateRecoverCodeUseCase } from './ValidateRecoverCodeUseCase'
import { ValidateRecoverCodeController } from './ValidateRecoverCodeController'

const userRepository = new UserRepository()
const validateRecoverCodeUseCase = new ValidateRecoverCodeUseCase(userRepository)
const validateRecoverCodeController = new ValidateRecoverCodeController(validateRecoverCodeUseCase)

export { validateRecoverCodeController }