# Bookmarks api

## Requirements

- Node.js, there is a `.nvmrc` file in the root of the project, you can use `nvm` (with `nvm use`
  command) to install the correct version of node
- NestJS, you can follow steps at https://docs.nestjs.com/first-steps

## Useful commands

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

## Things to improve
- delete user.hash
- relative imports don't work in tests
