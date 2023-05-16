import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string(),
  PORT: Env.schema.number(),
  NODE_ENV: Env.schema.enum(['development', 'production'] as const),
  APP_KEY: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  SESSION_DRIVER: Env.schema.enum(['cookie'] as const),
  CACHE_VIEWS: Env.schema.boolean(),
  DB_CONNECTION: Env.schema.string(),
  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),
})
