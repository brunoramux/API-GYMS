RF - REQUISITOS FUNCIONAIS
FUNCIONALIDADES DA APLICACAO

- [x] Deve ser possivel se cadastrar
- [x] Deve ser possivel se autenticar
- [x] Deve ser possivel obter o perfil de um usuario logado
- [x] Deve ser possivel obter o numero de checkins realizados pelo usuario logado
- [x] Deve ser possivel o usuario obter seu historico de checkins
- [x] Deve ser possivel o usuario buscar academias proximas
- [x] Deve ser possivel o usuario buscar academias pelo nome
- [x] Deve ser possivel o usuario realizar checkin em uma academia
- [x] Deve ser possivel validar o checkin de um usuario
- [x] Deve ser possivel cadastrar uma academia

 
RN - REGRAS DE NEGOCIO
CONDICOES PARA AS FUNCIONALIDADES DA APLICACAO.

- [x] O usuario nao deve poder se cadastrar com um email duplicado
- [x] O usuario nao pode fazer dois checkins no mesmo dia
- [x] O usuario nao pode fazer checkin se nao estiver 100 metros da academia
- [x] O checkin so pode ser validado ate 20 min apos criado
- [x] O checkin so pode ser validado por administrados
- [x] A academia so pode ser cadastrado por administradores

RNF - REQUISITOS NAO-FUNCIONAIS
QUAL BANCO DE DADOS
QUAL A ESTRATEGIA DE CACHE

- [x] A senha do usuario deve estar criptografada
- [x] Os dados da aplicacao precisam estar persistidos em um banco de dados postgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por pagina
- [x] O usuario deve ser identificado por um JWT (JSON Web Token)
