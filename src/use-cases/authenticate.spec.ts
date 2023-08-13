import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(userRepository)
  })

  it('should be able to Authenticate', async () => {
    await userRepository.create({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'bruno.lemos@live.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to Authenticate with wrong email', async () => {
    await userRepository.create({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'bruno@live.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to Authenticate with wrong email', async () => {
    await userRepository.create({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'bruno@live.com',
        password: '123454242',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
