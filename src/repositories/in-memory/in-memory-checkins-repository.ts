import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-ins-repository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export default class InMemoryCheckinsRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)
    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async findUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
      dayjs.extend(isSameOrAfter)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
