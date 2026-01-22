/*
|---------------------------------------------------------------------------
| databaseConfig
|---------------------------------------------------------------------------
|
| The databaseConfig module centralizes all database-related configuration
| values required to establish a connection to the PostgreSQL database.
|
| It reads connection parameters such as host, port, database name,
| username, and password from environment variables, allowing the
| application to be deployed consistently across multiple environments
| without code changes.
|
| This configuration is consumed by the database module to initialize
| the ORM connection in a secure and maintainable manner.
|
*/
export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});
