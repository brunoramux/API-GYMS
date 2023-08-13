import InMemoryGymsRepository from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymsRepository
let fetchNearbyGyms: FetchNearbyGymsUseCase
let createGymUseCase: CreateGymUseCase

describe('Fetch Nearby Gym', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
    fetchNearbyGyms = new FetchNearbyGymsUseCase(gymRepository)
  })

  it('should be able fetch nearby Gym', async () => {
    await createGymUseCase.execute({
      title: 'Near',
      description: 'Academia Javascript',
      phone: '61 99999 9999',
      latitude: -15.7508411,
      longitude: -47.8974607,
    })

    await createGymUseCase.execute({
      title: 'Far',
      description: 'Academia Javascript',
      phone: '61 99999 9999',
      latitude: -16.2436014,
      longitude: -47.9275923,
    })

    const { gyms } = await fetchNearbyGyms.execute({
      userLatitude: -15.7501695,
      userLongitude: -47.8935544,
    })
    // const distancia = getDistanceBetweenCoordinates(
    //   { latitude: -15.7508411, longitude: -47.8974607 },
    //   { latitude: -15.7501695, longitude: -47.8935544 },
    // )
    // console.log(distancia)

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near' })])
  })
})
