import express, { Application, Router } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { notFoundHandler, errorHandler } from "@middlewares/errorHandler.middleware"
import { client } from "./client"

export class App {
  public readonly app: Application

  constructor(routes: Router[]) {
    this.app = express()
    if (process.env.NODE_ENV === "production") {
      this.app.use(client())
    }
    this.initializeMiddleware()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  private initializeMiddleware(): void {
    this.app.use(cors())
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initializeRoutes(routes: Router[]): void {
    routes.forEach(router => this.app.use(router))
  }

  private initializeErrorHandling(): void {
    this.app.use(notFoundHandler)
    this.app.use(errorHandler)
  }
}
