import express, { Application } from 'express'
import cors from 'cors'
class App {
  express: Application

  constructor() {
    this.express = express()

    this.middlewares()
  };

  private middlewares() {
    this.express.use(express.json())
    this.express.use(cors({ origin: '*' }))
  }
}

export default new App().express
