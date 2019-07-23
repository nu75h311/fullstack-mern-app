import 'dotenv/config';

import app from './server';
import { connectDb } from './models';

connectDb().then(async () => {
    app.server;
});