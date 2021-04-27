import express, { Application } from 'express'
import cors from 'cors'

import Controllers from './routes'
import morgan from 'morgan'
class App {
  express: Application

  constructor() {
    this.express = express()

    this.middlewares()
    this.routes(Controllers)
  };

  private middlewares() {
    this.express.use(express.json())
    this.express.use(cors({ origin: '*' }))
    this.express.use(morgan(':method :remote-addr :status ":url" :response-time ms'))
  }

  private routes(Controllers: { forEach: (arg0: (Controller: any) => void) => void; }) {
    Controllers.forEach(Controller => {
      this.express.use('/', new Controller().router)
    })
  }
}

export default new App().express
