import http from "http"
require("dotenv").config()

import { mongoConnect } from "./services/mongo"

const PORT = process.env.PORT

import { app } from "./app"

const server = http.createServer(app)

async function startServer() {
  await mongoConnect()

  server.listen(PORT, () => {
    console.log(`🚀 Listening on port: ${PORT} ...`)
  })
}

startServer()
