import "@configs/dotenv.config"
import { App } from "./app"
import { connectMongoDB } from "@databases/mongodb.database"
import { connectRedis } from "@databases/redis.database"
import { authRouter } from "@routes/auth.router"

const startServer = async () => {
  await connectMongoDB()
  await connectRedis()

  const app = new App([authRouter])
  const port = Number(process.env.APP_PORT || 3000)

  app.app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
  })
}

startServer().catch(err => {
  console.error("❌ Failed to start server:", err)
})
