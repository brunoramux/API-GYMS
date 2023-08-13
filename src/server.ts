import { app } from './app'
import { env } from './env' // importacao da pasta env e nao do arquivo

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT, // usa a porta setada no arquivos de variaveis de ambiente. Se nenhuma porta estiver setada, usa padrao
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
