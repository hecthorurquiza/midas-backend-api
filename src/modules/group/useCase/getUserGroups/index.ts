import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { GroupUserRepository } from '../../repositories/implementations/GroupUserRepository'
import { GetUserGroupsUseCase } from './GetUserGroupsUseCase'
import { GetUserGroupsController } from './GetUserGroupsController'

const userRepository = new UserRepository()
const groupUserRepository = new GroupUserRepository()
const getUserGroupsUseCase = new GetUserGroupsUseCase(userRepository, groupUserRepository)
const getUserGroupsController = new GetUserGroupsController(getUserGroupsUseCase)

export { getUserGroupsController }