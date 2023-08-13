import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(
    data: Prisma.UserCreateInput /* outra maneira de pegar o tipo dos dados, sem criar interface. O Prisma traz essa opção através de métodos para cada Model */,
  ): Promise<User>
}
