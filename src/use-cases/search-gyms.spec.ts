import InMemoryGymsRepository from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase
let createGymUseCase: CreateGymUseCase

describe('Search Gym', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
    searchGymsUseCase = new SearchGymsUseCase(gymRepository)
  })

  it('should be able search gyms by', async () => {
    await createGymUseCase.execute({
      title: 'Academia Javascript',
      description: 'Academia Javascript',
      phone: '61 99999 9999',
      latitude: -15.7574505,
      longitude: -47.8941105,
    })

    await createGymUseCase.execute({
      title: 'Academia Maromba',
      description: 'Academia Maromba',
      phone: '61 99999 9999',
      latitude: -15.7574505,
      longitude: -47.8941105,
    })

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Academia',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
  })

  it('shout be able to fetch paginated search gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await createGymUseCase.execute({
        title: `Academia ${i}`,
        description: 'Academia Maromba',
        phone: '61 99999 9999',
        latitude: -15.7574505,
        longitude: -47.8941105,
      })
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia 21' }),
      expect.objectContaining({ title: 'Academia 22' }),
    ])
  })
})
