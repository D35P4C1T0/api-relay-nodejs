import express from "express"
import fetch from "node-fetch"
const router = express.Router()

const fetchJson = async () => {
  const url = process.env.BIN_URL
  try {
    const stream = await fetch(url, {})
    const streamJson = await stream.json()
    return streamJson
  } catch (err) {
    return { Error: err.stack }
  }
}

const sendJson = async (req) => {
  const url = process.env.BIN_URL
  console.log(req.body)
  try {
    const stream = await fetch(url, {
      method: "PUT",
      headers: { "Security-key": process.env.BIN_SECURE_KEY },
      body: JSON.stringify(req.body),
    })
    const streamJson = await stream.json()
    return streamJson
  } catch (err) {
    return { Error: err.stack }
  }
}

router.get("/", async (req, res) => {
  const data = await fetchJson()
  res.json(data)
})

router.post("/", async (req, res) => {
  const response = await sendJson(req)
  res.json(response)
})

export default router
