# Backend

For backend infrastructure, express was chosen with type script for development, this choice was made due to the request to use sql queries instead of an orm, for database communication the lib `pg` was necessary, the folder structure follow to the MVC principles using `controllers` for manager the incoming data and routes and models for database communication.

This system uses swagger as an API documentation and you can learn how to communicate with this API in the route `/api-docs`

![alt text](https://github.com/Dihh/cleaning-company/blob/main/documentation/swagger.png)

```
src
└── controllers
│	│
│	└──Client
│		└──ClientController.ts
│		└──ClientTest
│
└── Models
│	│
│	└──Client
│		└──ClientController.ts
│
│
└── Interface
│	│
│	└──Client
│		└──ClientInterface.ts
│
└── Utils
│
│	index.ts
```

## Tests

Tests use a database communication and to execute them it is necessary to define the environment variables.

You can easily run then using `docker compose`:

```sh
docker compose -f docker-compose-test.yml up backend
```

It will use the database `test` to run the tests, the database will be cleared before each executions

![alt text](https://github.com/Dihh/cleaning-company/blob/main/documentation/backend-test-coverage.png)

## Lint

The lint configuration will ensure code quality.

You can run this using `npm run lint`  command inside a nodejs environment ou inside the container.

The test coverage is almost 90% and can be verified bellow:

## Build

The build process will generate a dist folder with `js` code that should be used in a production environment.

You can run this using `npm run build` command inside a nodejs environment ou inside the container.

## Tolls versions

- Nodejs version 21

You can see others tools versions in `package.json`