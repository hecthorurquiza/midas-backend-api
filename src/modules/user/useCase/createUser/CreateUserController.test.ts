import { describe, it, expect, vi } from 'vitest'
import { Request, Response } from 'express'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'
import * as httpResponse from '~/utils/httpResponse'

describe('CreateUserController', () => {
  const createUserUseCase: CreateUserUseCase = {
    execute: vi.fn()
  } as unknown as CreateUserUseCase

  const createUserController = new CreateUserController(createUserUseCase)

  const req: Partial<Request> = { body: {} }

  const res: Response = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as unknown as Response

  const badRequestSpy = vi.spyOn(httpResponse, 'badRequest')
  const createdSpy = vi.spyOn(httpResponse, 'created')
  const conflictSpy = vi.spyOn(httpResponse, 'conflict')
  const internalServerErrorSpy = vi.spyOn(httpResponse, 'internalServerError')

  it('should return bad request if first_name is missing', async () => {
    req.body = { last_name: 'Doe', email: 'john.doe@example.com', phone: '1234567890', password: 'password' }
    await createUserController.handle(req as Request, res)
    expect(badRequestSpy).toHaveBeenCalledWith(res, 'Nome é obrigatório')
  })

  it('should return bad request if last_name is missing', async () => {
    req.body = { first_name: 'John', email: 'john.doe@example.com', phone: '1234567890', password: 'password' }
    await createUserController.handle(req as Request, res)
    expect(badRequestSpy).toHaveBeenCalledWith(res, 'Sobrenome é obrigatório')
  })

  it('should return bad request if email is missing', async () => {
    req.body = { first_name: 'John', last_name: 'Doe', phone: '1234567890', password: 'password' }
    await createUserController.handle(req as Request, res)
    expect(badRequestSpy).toHaveBeenCalledWith(res, 'Email é obrigatório')
  })

  it('should return bad request if phone is missing', async () => {
    req.body = { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: 'password' }
    await createUserController.handle(req as Request, res)
    expect(badRequestSpy).toHaveBeenCalledWith(res, 'Telefone é obrigatório')
  })

  it('should return bad request if password is missing', async () => {
    req.body = { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '1234567890' }
    await createUserController.handle(req as Request, res)
    expect(badRequestSpy).toHaveBeenCalledWith(res, 'Senha é obrigatória')
  })

  it('should create user and return created response', async () => {
    const user = { id: '1', first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '1234567890' }
    req.body = { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '1234567890', password: 'password' }
    createUserUseCase.execute = vi.fn().mockResolvedValue(user)
    await createUserController.handle(req as Request, res)
    expect(createdSpy).toHaveBeenCalledWith(res, user)
  })

  it('should return conflict if some data already exists', async () => {
    req.body = { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '1234567890', password: 'password' }
    createUserUseCase.execute = vi.fn().mockRejectedValue(new Error('Email já cadastrado'))
    await createUserController.handle(req as Request, res)
    expect(conflictSpy).toHaveBeenCalledWith(res, 'Email já cadastrado')
  })

  it('should return internal server error for other errors', async () => {
    req.body = { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '1234567890', password: 'password' }
    createUserUseCase.execute = vi.fn().mockRejectedValue(new Error('Unexpected error'))
    await createUserController.handle(req as Request, res)
    expect(internalServerErrorSpy).toHaveBeenCalledWith(res, 'Unexpected error')
  })
})