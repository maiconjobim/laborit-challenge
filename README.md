## Description
Project text to SQL

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations

```bash
# create migration
npm run migration:create -- ./src/core/infrastructure/database/migrations/NOME_DA_MIGRATION

# Run Migrations
npm run migration:run
```

## Run on Docker

```bash
$ docker-compose up

```


## Swagger

localhost:3000/api


## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```