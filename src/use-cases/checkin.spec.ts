import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import InMemoryCheckinsRepository from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckInUseCase } from './checkin'
import InMemoryGymsRepository from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-checkins-error'

let checkInRepository: InMemoryCheckinsRepository
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('Check-in Use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckinsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-id',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to Check In', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to Check In in the same Date', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to Check In different Dates', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to Check In on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-id2',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-15.7908584),
      longitude: new Decimal(-47.8789306),
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-id2',
        userId: 'user-id',
        userLatitude: -15.7574505,
        userLongitude: -47.8941105,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
