import { GroupRepository } from '../../repositories/implementations/GroupRepository'
import { DeleteGroupController } from './DeleteGroupController'
import { DeleteGroupUseCase } from './DeleteGroupUseCase'

const groupRepository = new GroupRepository()
const deleteGroupUseCase = new DeleteGroupUseCase(groupRepository)
const deleteGroupController = new DeleteGroupController(deleteGroupUseCase)

export { deleteGroupController }