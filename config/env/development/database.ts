export default ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST_DEV"),
      port: env.int("DATABASE_PORT_DEV"),
      database: env("DATABASE_NAME_DEV"),
      user: env("DATABASE_USERNAME_DEV"),
      password: env("DATABASE_PASSWORD_DEV"),
      ssl: env.bool("DATABASE_SSL_DEV"),
    },
  },
});
