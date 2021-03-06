/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env',
});

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_NAME,
} = process.env;

const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('[MONGO]: Connected!');
  })
  .catch((e) => {
    const msg = '[MONGO]: ERROR! Could not connect with MongoDB!';
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m');
    console.log(e);
  });

export default mongoose;
