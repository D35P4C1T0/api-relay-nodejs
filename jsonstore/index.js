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

const updateContent = async (req) => {
  const url = process.env["BIN_URL"]
  console.log(req.body.scan)
  try {
    let commands = [{ op: "add", path: "/records/-", value: req.body.scan }]
    const stream = await fetch(url, {
      method: "PATCH",
      headers: {
        "Security-key": process.env["BIN_SECURE_KEY"],
        "Content-type": "application/json-patch+json",
      },
      body: JSON.stringify(commands),
    })
    const streamJson = await stream.json()
    return streamJson
  } catch (err) {
    return { Error: err.stack }
  }
}

// router.get("/", async (req, res) => {
//   const data = await fetchJson()
//   res.json(data)
// })

router.post("/", async (req, res) => {
  const response = await updateContent(req)
  res.json(response)
})

export default router
