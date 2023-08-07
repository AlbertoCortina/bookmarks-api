# Bookmarks api

This is a simple API created with the purpose of learning NestJS.

The API consist of 2 main modules: one for user management (using JWT for authentication) and one
for bookmarks management.

## Requirements

- Node.js, there is a `.nvmrc` file in the root of the project, you can use `nvm` (with `nvm use`
  command) to install the correct version of node
- NestJS, you can follow steps at https://docs.nestjs.com/first-steps

## Technology overview

This is a list of the main technologies/libraries used in this project:

- NestJS with TypeScript
- Prisma, an ORM for TypeScript
- Docker to start PostgreSQL databases
- Jest for testing, there is an e2e test for all the endpoints
- PactumJS for API testing

## Useful commands

### Initial

- `npm install` -> to install all the dependencies
- `npm run db:dev:restart` -> to start database and apply Prisma migrations
- `npm run start:dev` -> to start the application in development mode

### NestJS

- `nest g module <name>` -> to generate a module
- `nest g service <name> --no-spec` -> to generate a service without spec file

### Prisma

- `npx prisma init` -> to initialize prisma
- `npx prisma migrate dev` -> runs prisma migrations
- `npx prisma studio` -> runs prisma studio (allows to see the database)
- `npx dotenv -e .env.test prisma studio` -> runs prisma studio with specific env variables

## Credits

This code was created following https://www.youtube.com/watch?v=GHTA143_b-s

