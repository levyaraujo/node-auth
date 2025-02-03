# node-auth

Esse projeto implementa um fluxo de autenticação utilizando JWT (JSON Web Token), onde foram aplicados conceitos de arquitetura de software como injeção de dependências, separação de responsabilidades e uso de middlewares.


## Tecnologias Utilizadas
- Express
- TypeScript
- Prisma
- JWT (jsonwebtoken): Biblioteca para criação e verificação de tokens JWT.
- bcryptjs: Biblioteca para hashing de senhas.
- Zod: Biblioteca para validação de schemas.

## Estrutura do Projeto
- src/application: Contém a lógica de aplicação, incluindo controladores, casos de uso, middlewares, interfaces e erros.
- src/factories: Contém factories para instanciar controladores e middlewares.
- src/server: Contém a configuração do servidor Express e adaptadores.
prisma: Contém a configuração do Prisma, incluindo o esquema do banco de dados.

## Padrões Utilizados
- Arquitetura em Camadas: Separação da lógica de aplicação em camadas distintas (controladores, casos de uso, middlewares).
- Injeção de Dependências: Uso de factories para instanciar dependências.
- Validação de Schemas: Uso do Zod para validação de dados de entrada.
- Autenticação JWT: Uso de tokens JWT para autenticação de usuários.
- Hashing de Senhas: Uso do bcryptjs para hashing seguro de senhas.


## Como Executar

1. Instale as dependências:
`pnpm install`

2. Configure as variáveis de ambiente no arquivo .env.

3. Execute as migrações do Prisma:
`pnpm prisma migrate dev`

4. Inicie o servidor:
`pnpm run dev`

O servidor estará disponível em http://localhost:3000.

## Endpoints
- POST /sign-up: Criação de um novo usuário.
- POST /sign-in: Autenticação de um usuário.
- GET /profile: Obtenção do perfil do usuário autenticado.
