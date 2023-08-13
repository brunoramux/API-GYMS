import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import InMemoryCheckinsRepository from '@/repositories/in-memory/in-memory-checkins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckinsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckinsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)
  })

  it('shout be able to get check-ins count from metrics ', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
