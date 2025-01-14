import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { MailProvider } from '~/provider/MailProvider'
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase'
import { ForgotPasswordController } from './ForgotPasswordController'

const userRepository = new UserRepository()
const mailProvider = new MailProvider()
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository, mailProvider)
const forgotPasswordController = new ForgotPasswordController(forgotPasswordUseCase)

export { forgotPasswordController }