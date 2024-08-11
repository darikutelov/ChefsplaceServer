import mongoose from "mongoose"

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!")
})

mongoose.connection.on("error", (error) => {
  console.log(error)
})

export async function mongoConnect() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set")
  }

  await mongoose.connect(process.env.MONGO_URI)
}

export async function mongoDisconnect() {
  await mongoose.disconnect()
}
