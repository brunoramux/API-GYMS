import InMemoryGymsRepository from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Academia Javascript',
      description: 'Academia Javascript',
      phone: '61 99999 9999',
      latitude: -15.7574505,
      longitude: -47.8941105,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
