# Server

Backend application for design editor. It provides Rest Endpoints for working with templates: Create, Update, Delete, Download, etc.

## How to start

Before starting server, create `.env` file. Required fields are provided in `.env.sample.`
Start in development mode using the following commands.

```sh
# install dependencies
yarn install
# start development server
yarn start
```

Web application service will start running at `localhost:PORT`

## Run in production

```sh
# install dependencies
docker build -t api
# start development server
docker run -p 8080:8080 api
```

## Endpoints

```
POST    /templates
PUT     /templates/:id
DELETE  /templates/:id
GET     /templates
GET     /templates/:id

POST    /shapes
GET     /shapes
DELETE  /shapes/:id

POST /uploads
PUT /uploads/:id
DELETE /uploads/:id
GET /uploads

GET /resources/pixabay

1.Load using HTML image element1


API Gateway -> {mediaServicex, authService, uploadingModule}

```
