# Cleaning company

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/Fa9E1uLNJc8/0.jpg)](https://www.youtube.com/watch?v=Fa9E1uLNJc8)

This system was developed to be used as a cleaning company's client management and routes calculator, so... lets see how it works:

We'll use a postgres database that will be connected by a nodejs(express) backend that will be consumed by a react frontend.

Both frontend and backend use typescript, eslint and jest for testing. The database does not have a migration system, but don't worry, there is a setup script that will handle the tables.

The backend, frontend, and database configuration files will be in this project, but you can go into each specific folder to learn more about each project.

```
│
└── backend
│
└── frontend
│
└── postgres
```

There are three differents way to run this project: Docker Compose, Docker and local.

The communication between backend and database will use environment variables and depending on chosen way to run this project you will need to set this variables.

## Docker Compose

You can easily run this project with `docker compose`, just clone this project go to the project folder and run:

```sh
$ docker compose up
```
 
Each container has the necessary configuration to install dependencies and define variables to start the entire system.

If you need to use a different database with difderents settings you can remove:

```yaml
postgres:
    image: postgres
    volumes:
        - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
        - ./postgres/data:/var/lib/postgresql/data
    environment:
        POSTGRES_PASSWORD: "admin"
    ports:
        - "5432:5432"
```

from the `docker-compose.yml` file and set the backend environment variables in:

```yaml
backend:
    build:
      context: ./backend
    ports:
      - 3000:3000
    volumes:
      - ./backend:/app
    environment:
      - PORT=3000
    command: bash start.sh
    depends_on:
      - postgres
```

## Docker

To run frontend:

```sh
$ docker run -v $(pwd)/frontend:/app -p 5173:5173 -w /app -it node:21-slim /bin/bash -c "bash start.sh"
```

To run backend:

```sh
$ docker run -v $(pwd)/backend:/app -p 3000:3000 -w /app -e DB_HOST=localhost --network host -it node:21-slim /bin/bash -c "bash start.sh"
```

To run database:

```sh
$ docker run -v $(pwd)/postgres/init.sq:/docker-entrypoint-initdb.d/init.sql -v $(pwd)/postgres/data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=admin postgres
```

You can change `$(pwd)` for you project folder if you need.

## Local

To run this project in a local environment you will need nodejs installed, a postgres database running and set backend environment variables.

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

# Frontend

For front infrastructure, vite react was chosen with type script for development. the whole system was developed in a single page and because of this the react-router was no necessary.

## Folder structure

The components should be stored inside the `components` folder, The components that can be reused like modals, toasts and etc should be stored inside the `components/shared` folder.

```
src
└── components
│	│
│	└──ClientComponent
│	│	└──Client
│	│	└──ClientTest
│	│
│	└──SharedComponents
│	 	└──SharerdComponent
│	 	└──SharerdComponentTest
│
└── interfaces
│	│
│	└──ClientInterface
│
└── api
│	│
│	└──ClientApiCommunication
│
│	App.tsx
```

## Tests

You can easily run then using `npm run test` command or with `docker compose`:

```sh
docker compose -f docker-compose-test.yml up front
```

The test coverage is over 90% and can be verified bellow:

![alt text](https://github.com/Dihh/cleaning-company/blob/main/documentation/frontend-test-coverage.png)

## Lint

The lint configuration will ensure code quality.

You can run this using `npm run lint`  command inside a nodejs environment ou inside the container.

## Build

The build process will generate a dist folder with `js` code that should be used in a production environment.

You can run this using `npm run build` command inside a nodejs environment ou inside the container.

## Tolls versions

- Nodejs version 21

You can see others tools versions in `package.json`

# Database

The database postgres was chosen and you can setup the database tables in docker mapping the `init.sql` to inside the container. the `data` folder will map all the data to outside the container to be preserved if the container be destroyed.

```
postgres
│
└── data
│
└── init.sql
```
