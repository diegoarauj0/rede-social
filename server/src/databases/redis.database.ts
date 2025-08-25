import Redis from "ioredis"

const redisUrl = process.env.DATABASE_REDIS_URL
if (!redisUrl) {
  throw new Error("❌ DATABASE_REDIS_URL is not defined in environment variables")
}

export const redis = new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 50, 2000),
})

export async function connectRedis(): Promise<void> {
  try {
    await redis.connect()
    console.log("✅ Connected to Redis successfully.")
  } catch (error) {
    console.error("❌ Failed to connect to Redis")
    throw error
  }

  // Graceful shutdown
  process.on("SIGINT", async () => {
    await redis.quit()
    throw "Redis connection closed"
  })
}
