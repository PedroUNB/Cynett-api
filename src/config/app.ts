import express, { Application } from 'express'
import redis from './redis'
class App {
  express: Application

  constructor() {
    this.express = express()
    redis
  }
}

export default new App().express
