# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:dasd

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# How to Start This App using Docker

This guide will walk you through the steps to start your app using Docker.

## Prerequisites

Before you begin, ensure that you have Docker and Docker Compose installed on your system.

## Dockerfile

The Dockerfile is used to build a Docker image for your application. It contains instructions for building the image and running your application inside a container. Here's how to create a Dockerfile for your app:

```Dockerfile:
FROM node:latest
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

This Dockerfile will:

Use the latest version of Node.js as the base image.
Set the working directory to /app.
Copy package.json and package-lock.json to the container.
Run npm install to install dependencies.
Copy the rest of the application files to the container.
Expose port 3000.
Start the application using the npm start command.

## docker-compose.yml

The docker-compose.yml file is used to define and run multi-container Docker applications. It allows you to define your application's services, networks, and volumes. Here's how to create a docker-compose.yml file for your app:

```yaml
version: "3.9"
services:
  app:
    build: .
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    command: npm run start:watch
```

This docker-compose.yml file will:

Use the build directive to build the Docker image for your application.
Mount the current directory as a volume inside the container at /app.
Mount the node_modules directory as a volume inside the container at /app/node_modules.
Map port 3000 on the host to port 3000 inside the container.
Set the NODE_ENV environment variable to development.
Start the application using the npm run start:watch command.

## Starting the Application

To start your application using Docker, run the following command in your terminal:

```
docker-compose up
```

This will start your application and output the logs to your terminal. You can now access your application by visiting http://localhost:3000 in your web browser.

To stop your application, press Ctrl+C in your terminal and run the following command:

```
docker-compose down
```

Congratulations! You have successfully started the application using Docker.
