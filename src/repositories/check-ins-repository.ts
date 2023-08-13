import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> // traz os campos de relacionamentos da tabela: CheckInUncheckedCreateInput

  findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
