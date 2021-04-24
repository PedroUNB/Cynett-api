import express, { Application } from 'express'
class App {
  express: Application

  constructor() {
    this.express = express()
  }
}

export default new App().express
