import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let userRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password: '12345',
    })
    const isPasswordCorrectlyHashed = await compare('12345', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'Bruno Ramos',
      email,
      password: '12345',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Bruno Ramos',
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
