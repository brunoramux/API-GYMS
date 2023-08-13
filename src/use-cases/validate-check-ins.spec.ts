import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import InMemoryCheckinsRepository from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from './validate-check-ins'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-checkin-validation-error'

let checkInRepository: InMemoryCheckinsRepository
let validadeCheckInUseCase: ValidateCheckInUseCase

describe('Validade Check-in Use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckinsRepository()
    validadeCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to Validate Check In', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await validadeCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should be able to Validate Check In', async () => {
    await expect(() =>
      validadeCheckInUseCase.execute({
        checkInId: 'check-in-inexistente',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('shoud not be able to Validate Check In after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    vi.advanceTimersByTime(1000 * 60 * 21)

    await expect(() =>
      validadeCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
