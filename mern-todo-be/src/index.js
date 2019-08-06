import app from './server';
import { connectDb } from './models';

connectDb().then(async () => {
  await app.server;
});
