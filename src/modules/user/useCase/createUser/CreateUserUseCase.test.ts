import { describe, it, expect, vi } from 'vitest'
import { CreateUserUseCase } from './CreateUserUseCase'
import { IUserRepository } from '../../repositories/IUserRepository'
import { User } from '../../entities/User'

describe('CreateUserUseCase', () => {
  const mockUserRepository: IUserRepository = {
    create: vi.fn(),
    findOne: vi.fn(),
    saveCode: vi.fn(),
    changePassword: vi.fn(),
  }

  const createUserUseCase = new CreateUserUseCase(mockUserRepository)

  const userData = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    password: 'password123'
  }

  it('should create a new user successfully', async () => {
    vi.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(null)
    vi.spyOn(mockUserRepository, 'create').mockResolvedValueOnce(new User({
      id: '1',
      firstName: userData.first_name,
      lastName: userData.last_name,
      email: userData.email,
      phone: userData.phone,
      password: 'encryptedPassword'
    }))

    const result = await createUserUseCase.execute(userData)

    expect(result).toEqual({
      id: '1',
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone: userData.phone,
    })
  })

  it('should throw an error if email is already registered', async () => {
    vi.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(new User(userData))

    await expect(createUserUseCase.execute(userData)).rejects.toThrow('Email já cadastrado')
  })

  it('should throw an error if phone is already registered', async () => {
    vi.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(null)
    vi.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(new User(userData))

    await expect(createUserUseCase.execute(userData)).rejects.toThrow('Telefone já cadastrado')
  })

  it('should throw an error if user creation fails', async () => {
    vi.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(null)
    vi.spyOn(mockUserRepository, 'create').mockResolvedValueOnce(null)

    await expect(createUserUseCase.execute(userData)).rejects.toThrow('Erro ao criar usuário')
  })
})