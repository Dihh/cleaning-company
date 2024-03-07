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