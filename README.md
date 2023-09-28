# Vi Coding Assignment

### Author: Dean Harel

### General

This project is a `Node.js` `express` based **web-server** that exposes three endpoints:

- `HTTP GET /moviesPerActor`
  - Answering the question _"which Marvel movies did each actor play in?"_
- `HTTP GET /actorsWithMultipleCharacters`
  - Answering the question _"who are the actors who played more than one Marvel character?"_
- `HTTP GET /charactersWithMultipleActors`
  - Answering the question _"Which characters were played by more than one actor?"_

### Tools

- `jest` for testing
- `nodemon` for automatic reload during development

## Getting Started

### Install dependencies

Before starting to code, don't forget to install all dependencies by running:

```shell
yarn
```

### How to use

You can start the project by running:

```shell
yarn start
```

Please note that a `.env` file should exist with the required environment variables. For the specific variables check the `.env.example` file.

Assuming the environment is correctly set, running the aforementioned script initializes the web-server, which in turn will be ready to handle the requests mentioned above. Responses are based on a predefined set of movies and actors of relevance.

#### Environment variables

Refer to `.env.example` for the complete list of variables required for running this project.

**NOTE**: Please **DO NOT** commit your `.env`, nor create variations per node environment.

### Running tests

Run all tests by running:

```shell
yarn test
```
