import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  // private usersRepository: any

  // constructor(usersRepository: UsersRepository){
  //   this.usersRepository = usersRepository
  // }

  constructor(private usersRepository: UsersRepository) {} // vai receber uma instancia do repositorio responsavel pela conexao ao banco. Essa e a maneira mais simples de fazer o codigo acima.

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      // se email ja existe, retorna erro
      throw new UserAlreadyExistsError()
    }

    const data = {
      name,
      email,
      password_hash,
    }

    // const prismaUserRepository = new PrismaUserRepository()

    const user = await this.usersRepository.create(data)

    return {
      user,
    }
  }
}
