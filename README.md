# Project Text to SQL

## Description
This project is a Text-to-SQL converter that uses Natural Language Processing (NLP) to generate SQL queries from natural language questions. It's built with NestJS and integrates with various LLM (Language Model) providers.

## Features
- Convert natural language questions to SQL queries
- Support for multiple LLM providers
- Database connection management
- Query history tracking
- Swagger API documentation


## Project setup

1. Install dependencies:
```bash
$ npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your configuration
```


## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Docker Deployment
```bash
docker-compose up
```

## Database Migrations

```bash
# create migration
npm run migration:create -- ./src/core/infrastructure/database/migrations/NOME_DA_MIGRATION

# Run Migrations
npm run migration:run
```


## API Documentation
Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```


## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project Structure

This project follows Domain-Driven Design (DDD) principles, which emphasize the importance of the domain and domain logic in software development. The structure is organized to reflect the different layers of the application, promoting separation of concerns and maintainability.

### Directory Breakdown

```plaintext
src/
├── core/                     # Core domain logic and application services
│   ├── api/                  # API controllers and routes
│   ├── application/          # Application services and use cases
│   ├── domain/               # Domain entities and value objects
│   └── infrastructure/       # Infrastructure concerns (repositories, data sources)
├── llm-provider/             # Integration with Language Model Providers
└── main.ts                   # Entry point of the application
```

### Explanation of Each Layer

- **Core**: This is the heart of the application, containing the business logic. It is divided into several subdirectories:
  - **API**: Contains controllers that handle incoming requests and responses, mapping them to the appropriate application services.
  - **Application**: Contains use cases that orchestrate the flow of data between the domain and the API. This layer is responsible for implementing business rules and application logic.
  - **Domain**: Contains the core entities and value objects that represent the business model. This layer encapsulates the business rules and logic, ensuring that the application behaves correctly.
  - **Infrastructure**: Contains the implementation details for data access, such as repositories and database connections. This layer interacts with external systems and provides the necessary data to the application layer.

- **LLM-Provider**: This directory handles the integration with various Language Model Providers, encapsulating the logic required to interact with these external services.