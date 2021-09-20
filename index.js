import dotenv from "dotenv"
import express from "express"
import cors from "cors"

dotenv.config()
const app = express()

const port = 3000

import jsonstore from "./jsonstore/index.js"

app.use(express.json())

// const whitelist = ["http://127.0.0.1"]
const whitelist = [process.env.BACKEND_URL]
const corsOption = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin !== -1)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  optionsSuccessStatus: 200,
}

app.use(cors(corsOption))

app.get("/", (req, res) => res.json({ success: "Hello World" }))

app.use("/jsonstore", jsonstore)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
