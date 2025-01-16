import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { ChangePasswordUseCase } from './ChangePasswordUseCase'
import { ChangePasswordController } from './ChangePasswordController'

const userRepository = new UserRepository()
const changePasswordUseCase = new ChangePasswordUseCase(userRepository)
const changePasswordController = new ChangePasswordController(changePasswordUseCase)

export { changePasswordController }