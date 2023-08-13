import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  // variavel de validacao do zod
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3000), // metodo coerce.number tranforma o valor da porta em numero
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env) // valida o arquivo de variaveis ambiente de acordo com o schema criado acima

if (_env.success === false) {
  console.error('Variaveis de ambiente invalidas.', _env.error.format()) // mostra erro caso tenha dado erro nas variaveis de ambiente

  throw new Error('Variaveis de ambiente invalidas.') // derruba a aplicacao
}

export const env = _env.data
