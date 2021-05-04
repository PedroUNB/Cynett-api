/* eslint-disable no-console */
import app from '@config/app';

const port = parseInt(process.env.PORT) || 4000;
const host = process.env.HOST || '127.0.0.1';

app
  .listen(port, host, () => {
    console.log(`[HOST]: Listening on: http://${host}:${port}`);
  })
  .on('error', () => {
    console.log('[HOST]: Error with app');
  });
