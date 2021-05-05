import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import mongoose from '@config/mongodb';
import redis from '@config/redis';
import Controllers from './routes';
import helmet from 'helmet';
class App {
  express: Application;

  constructor() {
    this.express = express();

    this.mongo();
    this.middlewares();
    this.routes(Controllers);
  }

  private mongo() {
    return mongoose;
  }

  private redis() {
    return redis;
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(cors({ origin: '*' }));
    // this.express.use(helmet());
    this.express.use(
      morgan(':method :remote-addr :status ":url" :response-time ms'),
    );
  }

  private routes(Controllers: {
    forEach: (arg0: (Controller: any) => void) => void;
  }) {
    Controllers.forEach((Controller) => {
      this.express.use('/', new Controller().router);
    });
  }
}

export default new App().express;
