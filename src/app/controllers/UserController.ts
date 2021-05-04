import * as express from 'express';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IControllerBase from '@interfaces/IControllerBase.interface';
import User from '@models/User';

import IUser from '@interfaces/IUser.interface';
import redis from '@config/redis';

class UserController implements IControllerBase {
  public path = '/user';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.index);
    this.router.post(this.path, this.save);

    this.router.get(this.path + '/:id', this.getById);
    this.router.put(this.path + '/:id', this.update);
    this.router.delete(this.path + '/:id', this.delete);

    this.router.post('/signup', this.signup);
    this.router.post('/signin', this.signin);
  }

  index = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  save = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    User.create({ email, password })
      .then(() => {
        return res.status(200).json({ message: 'User was created!' });
      })
      .catch((err) => {
        return res.status(401).json(err);
      });
  };

  getById = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  update = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  delete = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  signup = async (req: Request, res: Response) => {
    return res.status(200).send();
  };

  signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user: IUser;
    user = JSON.parse(await redis.getAsync(email));

    if (!user) {
      user = await User.findOne({ email });

      if (!user.isValidPassword(password)) {
        return res.status(401).json({ message: 'Invalid email or password!' });
      }
    }

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 3; // 3 days

    const payload = {
      _id: user._id,
      email: user.email,
      iat,
      exp,
    };

    const token = jwt.sign(payload, 'authSecret', { algorithm: 'HS512' });

    redis.set(email, JSON.stringify(user));

    return res.status(200).json({ ...payload, token });
  };
}

export default UserController;
