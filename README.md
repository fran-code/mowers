# Mower's

The project consists of two parts, frontend and backend.

## Frontend

The frontend is developed with React and consists of a graphical interface that allows us to easily enter the data required by the api through a form, it also shows the trajectories of the mowers using svg. It is developed with typescript and bootstrap.

It can be started on port 3000 with the command:

> npm start

The tests are developed with RTL and Cypress. To run the unit tests we launch the command: 

> npm run test

For the end to end tests we run the command:

> npm run cy:open

This opens the Cypress interface and allows us to run the test, we must have the backend up to run this test.

## Backend

The backend is developed in NodeJs with ExpressJs using typescript. With the command:

> npm start

We start the server on port 4003.

With the command:

> npm run test

Run the unit test developed with Mocha and Chai.

## Run with Docker Compose

It is possible to lift both parts with their corresponding docker with the command:

> docker-compose up -d --build

This starts the projects on port 3000 for the frontend and 4004 for the backend.