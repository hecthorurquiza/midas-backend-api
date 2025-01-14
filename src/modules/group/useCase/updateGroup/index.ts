import { GroupRepository } from '../../repositories/implementations/GroupRepository'
import { UpdateGroupController } from './UpdateGroupController'
import { UpdateGroupUseCase } from './UpdateGroupUseCase'

const groupRepository = new GroupRepository()
const updateGroupUseCase = new UpdateGroupUseCase(groupRepository)
const updateGroupController = new UpdateGroupController(updateGroupUseCase)

export { updateGroupController }