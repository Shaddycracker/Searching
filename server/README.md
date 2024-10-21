# NodeTs-Express-Service-Based-Template

![Node](https://img.shields.io/badge/-Node-339933?style=flat-square&logo=Node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=TypeScript&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=Express&logoColor=white)
![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?style=flat-square&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)
![PostgresSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=PostgreSQL&logoColor=white)
![Sqlite](https://img.shields.io/badge/-Sqlite-003B57?style=flat-square&logo=Sqlite&logoColor=white)
![MariaDB](https://img.shields.io/badge/-MariaDB-003545?style=flat-square&logo=MariaDB&logoColor=white)
![MSSql](https://img.shields.io/badge/-MSSql-CC2927?style=flat-square&logo=Microsoft-SQL-Server&logoColor=white)
![DB2](https://img.shields.io/badge/-DB2-CC0000?style=flat-square&logo=IBM&logoColor=white)
![Snowflake](https://img.shields.io/badge/-Snowflake-00BFFF?style=flat-square&logo=Snowflake&logoColor=white)
![Oracle](https://img.shields.io/badge/-Oracle-F80000?style=flat-square&logo=Oracle&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square&logo=Mongoose&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white)
![Validations](https://img.shields.io/badge/-Validations-FF0000?style=flat-square)
![Socket](https://img.shields.io/badge/-Socket-FF6900?style=flat-square&logo=Socket.io&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=white)
![CronJobs](https://img.shields.io/badge/-CronJobs-00FFFF?style=flat-square)

A fully configurable Node.js, Express, and TypeScript server template with a service-based architecture
that can interact with MySQL, PostgresSQL, Sqlite, MariaDB, MSSql, DB2, Snowflake, Oracle, MongoDB.
Out-of-the-box validation, documentation generation, and
more.

## Features

- **Node.js, Express, TypeScript**: Robust server setup using Node.js, Express, and TypeScript.
- **Sequelize**: Integration with Sequelize for SQL database operations.
- **Mongoose**: Integration with Mongoose for MongoDB database operations.
- **Database Compatibility**: Interact with MySQL, PostgreSQL, MariaDB, Sqlite, MSSql, MongoDB.
- **Validation Mechanism**: Pre-built validations for request payloads.
- **Automated Swagger Documentation**: Automatically generated documentation available at `/api-docs`.
- **Service-Based Architecture**: Modular approach for better organization and scalability.
- **Socket Events**: Socket event handling using Socket.io.
- **Docker**: Dockerized for easy deployment.
- **Cron Jobs**: Schedule tasks using cron jobs.

## Modules

### Automated Swagger Docs

- Swagger documentation auto-generated for all routes.
- Accessible at `/api-docs`.
- Generated using the `doc` method in the `MasterController` class and Joi validation schemas.

### MasterController (Heart of the application)

The `MasterController` is the backbone, providing functionalities for managing HTTP requests, socket events, payload
validation, and more.

#### Features

- **Controller Logic Handling**: `restController` method manages HTTP requests.
- **Socket Event Handling**: `socketController` method manages socket events.
- **Cron Job Scheduling**: `cronController` method schedules cron jobs.
- **Payload Validation**: `joiValidator` method validates incoming request payloads.
- **Swagger Documentation Generation**: `doc` method generates Swagger documentation.
- **Route Handling**: `get`, `post`, `put`, and `delete` methods register routes within the Express router.

#### Usage

Extend the `MasterController` to create controller classes for specific routes or socket events. Use the provided
methods for efficient request handling, validation, and documentation generation.

## Installation

> #### Install dependencies
>
> ```bash
> $ npm install or yarn
> ```
>
> #### Start the server
>
> ```bash
> $ npm run dev or yarn dev
> ```
>
> #### Build the project
>
> ```bash
> $ npm run build or yarn build
> ```
>
> #### Run the project
>
> ```bash
> $ npm run start or yarn start
> ```

## Creating APIs

### Controller

```typescript
class Controller extends MasterController<IParams, IQuery, IBody> {
    // swagger documetation for the api
    static doc() {
        return {
            tags: ['User'],
            summary: 'Register User',
            description: 'Register User',
        };
    }

    // add your validations here,
    // rest of the swagger documentation will be generated automatically from the validation
    public static validate(): RequestBuilder {
        const payload = new RequestBuilder();

        // request body validation
        payload.addToBody(
            Joi.object().keys({
                name: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(20).required(),
            }),
        );

        // request query validation
        payload.addToQuery(
            Joi.object().keys({
                limit: Joi.number().required(),
                offset: Joi.number().required(),
            }),
        );

        // request params validation
        payload.addToParams(
            Joi.object().keys({
                id: Joi.number().required(),
            }),
        );
        return payload;
    }

    // controller function
    async restController(
        params: IParams,
        query: IQuery,
        body: IBody,
        headers: any,
        allData: any): Promise<ResponseBuilder> {
        // your code here
        return new ResponseBuilder(200, Response, 'Success Message');
    }


}

export default Controller;
```

#### Controller Generics

- **IParams:** Request params interface/type
- **IQuery:** Request query interface/type
- **IBody:** Request body interface/type

#### restController Parameters

- **params:** Request params (eg. /user/:id)
- **query:** Request query (eg. /user?limit=10&offset=0)
- **body:** Request body
- **headers:** Request headers
- **allData:** All request data (all the above-combined + custom data from middlewares)


### Router File

```typescript
import express from 'express'
import Controller from '../Controller'

export default (app: express.Application) => {
    // REST Routes
    Controller.get(app, '/user/:id', [
        /* Comma separated middlewares */
    ])
    Controller.post(app, '/user/:id', [
        /* Comma separated middlewares */
    ])

}
```

> **Important**: Make sure to name your router file as `*.routes.ts` or `*.routes.js`

> **Note:** You don't need to import your router file to anywhere,
> put it in the routes directory, and it will be automatically
> taken care by the package.

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
