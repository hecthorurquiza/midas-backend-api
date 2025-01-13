import { UserRepository } from '~/modules/user/repositories/implementations/UserRepository'
import { GroupRepository } from '../../repositories/implementations/GroupRepository'
import { GroupUserRepository } from '../../repositories/implementations/GroupUserRepository'
import { CreateGroupUseCase } from './CreateGroupUseCase'
import { CreateGroupController } from './CreateGroupController'

const groupRepository = new GroupRepository()
const groupUserRepository = new GroupUserRepository()
const userRepository = new UserRepository()
const createGroupUseCase = new CreateGroupUseCase(groupRepository, groupUserRepository, userRepository)
const createGroupController = new CreateGroupController(createGroupUseCase)

export { createGroupController }