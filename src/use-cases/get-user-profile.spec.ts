import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import InMemoryUsersRepository from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get User Profile Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to Get User Profile', async () => {
    const createdUser = await userRepository.create({
      name: 'Bruno Ramos',
      email: 'bruno.lemos@live.com',
      password_hash: await hash('123456', 6),
    })

    const user = await userRepository.findById(createdUser.id)

    expect(user?.name).toEqual(expect.any(String))
  })

  it('should not be able to Get User Profile with wrong Id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'non-exiting-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
