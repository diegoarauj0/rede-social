declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: number
    DATABASE_MONGODB_URL: string
    DATABASE_REDIS_URL: string
    CORS_ORIGIN: string
    CORS_CREDENTIALS: string
    BCRYPT_SALT_ROUNDS: string
    SESSION_SECURE: string
    SESSION_ACCESS_EXPIRE: string
    SESSION_REFRESH_EXPIRE: string
    SESSION_ACCESS_SECRET: string
    SESSION_REFRESH_SECRET: string
  }
}
