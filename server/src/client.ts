import express, { Router } from "express"
import path from "path"
import fs from "fs"

export function client(): Router {
  const router = Router()

  const client = path.join(__filename, "../../../client/dist")

  if (!fs.existsSync(client)) {
    throw new Error("React/vite files not found.")
  }

  router.use(express.static(client))
  router.use((req, res, next) => {
    const acceptsHtml = req.headers.accept && req.headers.accept.includes("text/html")

    if (acceptsHtml) {
      return res.sendFile(path.join(client, "index.html"))
    }

    return next()
  })

  return router
}
