import { describe, it, expect } from 'vitest'
import { User } from './User'

describe('User Entity', () => {
  it('should create a user instance with partial data', () => {
    const userData = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'hashedPassword',
      code: null,
      expireIn: null
    }

    const user = new User(userData)

    expect(user).toBeInstanceOf(User)
    expect(user.id).toBe(userData.id)
    expect(user.firstName).toBe(userData.firstName)
    expect(user.lastName).toBe(userData.lastName)
    expect(user.email).toBe(userData.email)
    expect(user.phone).toBe(userData.phone)
    expect(user.password).toBe(userData.password)
    expect(user.code).toBeNull()
    expect(user.expireIn).toBeNull()
  })

  it('should create a user instance with code and expireIn', () => {
    const now = new Date()
    const userData = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'hashedPassword',
      code: '123456',
      expireIn: now
    }

    const user = new User(userData)

    expect(user.code).toBe(userData.code)
    expect(user.expireIn).toBe(now)
  })
})
