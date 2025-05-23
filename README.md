# Estrutura do Projeto

## Objetivo

Desenvolver uma aplicação back-end utilizando Node.js com Express e TypeScript. A aplicação deve ter autenticação, persistência de dados em um banco de dados real, ser testada com Jest e containerizada com Docker e Kubernetes.

**Disclaimer**: Em caso de algum erro, verifique se as portas estão disponíveis.

## Por que usar esta arquitetura?

- **Escalabilidade**: A arquitetura proposta permite que a aplicação cresça de forma organizada, facilitando a adição de novas funcionalidades sem comprometer a estrutura existente.
- **Manutenibilidade**: A separação de responsabilidades entre diferentes diretórios e arquivos torna o código mais fácil de entender e manter, permitindo que diferentes desenvolvedores trabalhem em partes distintas do projeto simultaneamente.
- **Testabilidade**: A estrutura modular facilita a implementação de testes unitários e de e2e, garantindo que cada parte da aplicação funcione corretamente antes de ser integrada ao todo.

## Prisma e o arquivo prisma-environment-jest.ts

- **Prisma**: O Prisma é uma ferramenta de ORM (Object-Relational Mapping) que simplifica a interação com o banco de dados, permitindo que os desenvolvedores escrevam consultas de forma mais intuitiva e segura. Ele também facilita a migração de esquemas e a validação de dados.
- **prisma-environment-jest.ts**: Este arquivo é utilizado para configurar o ambiente de testes com o Prisma. Ele garante que os testes sejam executados em um banco de dados isolado, evitando que os dados de desenvolvimento sejam afetados. Além disso, cada arquivo de teste roda individualmente em schemas diferentes, proporcionando um ambiente controlado e previsível para a execução de testes, aumentando a confiabilidade dos resultados.

## Como Rodar a Aplicação

### Com Node.js

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente. Você pode criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   # Exemplo de .env
   NODE_ENV="development"
   PORT="3333"
   JWT_SECRET="seu_segredo"
   DATABASE_URL="postgresql://docker:docker@localhost:5432/main_database"
   ```
   
4. Inicie os serviços com Docker Compose:
   ```bash
   docker-compose -f docker-compose-node.yaml up -d
   ```

5. Construa a aplicação:
   ```bash
   pnpm build
   ```

6. Inicie a aplicação:
   ```bash
   pnpm start
   ```

### Com Docker

1. Certifique-se de ter o Docker e o Docker Compose instalados.

2. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

3. Crie a imagem Docker:
   ```bash
   docker build -t back-cogna:local .
   ```

4. Inicie os serviços com Docker Compose:
   ```bash
   docker-compose up -d
   ```

5. A aplicação estará disponível em `http://localhost:3333`.

### Com Kubernetes

1. Certifique-se de ter o Kubernetes e o kubectl instalados.

2. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

3. Crie a imagem Docker:
   ```bash
   docker build -t back-cogna:local .
   ```

4. Aplique as configurações do Kubernetes:
   ```bash
   kubectl apply -f k8s/
   ```

5. Para remover os recursos do Kubernetes, execute:
   ```bash
   kubectl delete -f k8s/
   ```

## Features

### Autenticação

- [x] Autenticação utilizando e-mail e senha com JWT;
- [x] Registro de novos usuários;

### Produto

- [x] Listagem de produtos;
- [x] Detalhes do produto.

Este projeto é estruturado para facilitar o desenvolvimento de uma aplicação fullstack robusta. A organização do código é projetada para promover escalabilidade, manutenibilidade e facilidade de testes. Vamos explorar cada parte da estrutura e suas funcionalidades.

## Visão Geral do Diretório

- **src/**: Este diretório contém o código principal da aplicação. É onde a lógica de negócios e a interação com o banco de dados são implementadas.
  - **http/**: Abriga a camada HTTP, que é responsável por lidar com as requisições e respostas da aplicação. Aqui, você encontrará rotas e middleware.
    - **controllers/**: Este subdiretório contém os controladores que gerenciam as rotas da aplicação.
      - **users/**: Contém as rotas relacionadas à autenticação de usuários.
      - **products/**: Contém as rotas relacionadas à listagem e detalhes dos produtos.
    - **middlewares/**: Este subdiretório contém funções middleware, que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware no ciclo de requisição-resposta. Um exemplo importante é o middleware de tratamento de erros, que captura e gerencia erros que ocorrem durante a execução da aplicação.
  - **use-cases/**: Este diretório implementa a lógica de negócios da aplicação, encapsulando as funcionalidades principais, como a criação de produtos e a autenticação de usuários.
  - **errors/**: Contém classes de erro personalizadas que fornecem um tratamento de erro significativo em toda a aplicação.

- **tests/**: Este diretório contém testes unitários e de ponta a ponta (e2e) para garantir a confiabilidade da aplicação. Os testes são organizados para espelhar a estrutura do diretório `src`, facilitando a localização de testes correspondentes para cada módulo.

- **docker-compose.yaml**: Este arquivo define os serviços necessários para a aplicação, incluindo bancos de dados PostgreSQL para os ambientes de desenvolvimento e teste. O uso do Docker facilita a configuração e a execução de ambientes consistentes.

## Testes

O projeto utiliza o Jest para testes, com foco em testes unitários e de ponta a ponta (e2e). Os seguintes scripts estão disponíveis para testes:

- `npm run test`: Executa os testes localizados no diretório `src/use-cases`.
- `npm run test:watch`: Executa testes em modo de observação, re-executando automaticamente os testes em alterações de arquivo.
- `npm run test:e2e`: Executa testes de ponta a ponta utilizando um banco de dados de teste.
- `npm run test:e2e:watch`: Executa testes de ponta a ponta em modo de observação.

Para garantir a qualidade do código, o ESLint está configurado para impor padrões de codificação e detectar problemas potenciais.

## Conclusão

Esta estrutura de projeto e estratégia de testes visam fornecer uma base sólida para construir e manter uma aplicação fullstack escalável. Ao seguir as melhores práticas em organização de código e testes, podemos garantir um produto de alta qualidade que atenda às necessidades de nossos usuários.
