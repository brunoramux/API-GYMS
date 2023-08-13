import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import InMemoryCheckinsRepository from '@/repositories/in-memory/in-memory-checkins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckinsRepository
let fetchUserCheckInsHistory: FetchUserCheckInsHistoryUseCase

describe('Fetch Check-in History', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckinsRepository()
    fetchUserCheckInsHistory = new FetchUserCheckInsHistoryUseCase(
      checkInRepository,
    )

    // gymsRepository.items.push({
    //   id: 'gym-id',
    //   title: 'JavaScript Gym',
    //   description: '',
    //   phone: '',
    //   latitude: new Decimal(0),
    //   longitude: new Decimal(0),
    // })
  })

  it('shout be able to fetch check-in history', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await fetchUserCheckInsHistory.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('shout be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await fetchUserCheckInsHistory.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
