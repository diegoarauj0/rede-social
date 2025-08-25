import mongoose, { ConnectOptions } from "mongoose"

export async function connectMongoDB(): Promise<void> {
  const uri = process.env.DATABASE_MONGODB_URL
  if (!uri) {
    throw new Error("❌ DATABASE_MONGODB_URL is not defined in environment variables")
  }

  console.log("⏳ Connecting to MongoDB...")

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    } as ConnectOptions)

    console.log("✅ MongoDB connected")
  } catch (error) {
    console.error("❌ MongoDB connection")
    throw error
  }

  // Graceful shutdown
  process.on("SIGINT", async () => {
    await mongoose.connection.close()
    throw "MongoDB connection closed"
  })
}
