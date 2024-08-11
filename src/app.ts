import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import { api } from "./routes/api"

const app = express()

app.use(morgan("combined"))
app.use(cors())
app.use(cookieParser())

app.use(express.json())
app.use("/api/v1", api)

export { app }
